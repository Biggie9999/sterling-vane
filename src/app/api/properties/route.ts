import { NextResponse } from "next/server"

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY

// Uses "Realty in US" by ApiDojo on RapidAPI — pulls real listings from Realtor.com
// Free tier: 500 requests/month, no credit card required
// Sign up at: https://rapidapi.com/apidojo/api/realty-in-us
// Then set RAPIDAPI_KEY in your .env file

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location") || "Miami, FL"
  const type = searchParams.get("type") || "for_rent" // for_rent | for_sale

  if (!RAPIDAPI_KEY) {
    return NextResponse.json(
      { error: "No RAPIDAPI_KEY set. Add it to .env to enable live data.", listings: [] },
      { status: 200 }
    )
  }

  try {
    // Realty-in-US uses POST with a JSON body
    // Parse "City, ST" into separate city / state_code fields where possible
    const parts = location.split(",").map((s) => s.trim())
    const city = parts[0] || location
    const stateCode = parts[1]?.slice(0, 2).toUpperCase() || ""

    const body: Record<string, any> = {
      limit: 12,
      offset: 0,
      status: [type === "for_sale" ? "for_sale" : "for_rent"],
      sort: { direction: "desc", field: "list_date" },
    }
    if (city) body.city = city
    if (stateCode) body.state_code = stateCode

    const res = await fetch("https://realty-in-us.p.rapidapi.com/properties/v3/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": RAPIDAPI_KEY!,
        "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Realty API ${res.status}: ${text.slice(0, 200)}`)
    }

    const data = await res.json()
    const results =
      data?.data?.home_search?.results ||
      data?.data?.results ||
      data?.results ||
      []

    const listings = results.slice(0, 12).map((p: any) => {
      const loc = p.location?.address || {}
      const price = p.list_price || p.price || 0
      const beds = p.description?.beds ?? "—"
      const baths = p.description?.baths_consolidated ?? p.description?.baths ?? "—"
      const sqft = p.description?.sqft
      const photo = p.primary_photo?.href || p.photos?.[0]?.href || null
      const propId = p.property_id || p.listing_id || String(Math.random())
      const slug = p.permalink || null

      return {
        zpid: propId,
        name: loc.line || "Luxury Property",
        location: [loc.city, loc.state_code].filter(Boolean).join(", "),
        price:
          type === "for_sale"
            ? price
              ? `$${Number(price).toLocaleString()}`
              : "Price on Request"
            : price
            ? `$${Math.round(price).toLocaleString()}/mo`
            : "Price on Request",
        rawPrice: price,
        beds,
        baths,
        sqft: sqft ? Number(sqft).toLocaleString() : null,
        image: photo,
        url: slug
          ? `https://www.realtor.com/realestateandhomes-detail/${slug}`
          : null,
        daysOnMarket: p.list_date
          ? Math.floor(
              (Date.now() - new Date(p.list_date).getTime()) / 86400000
            )
          : null,
        type,
      }
    })

    return NextResponse.json({ listings, source: "realtor-live", location })
  } catch (err: any) {
    console.error("Realty API fetch error:", err.message)
    return NextResponse.json(
      { error: err.message, listings: [], source: "error" },
      { status: 200 }
    )
  }
}
