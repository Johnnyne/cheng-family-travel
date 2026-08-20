---
name: kml-generator
description: >-
  Standardized rules, specifications, and automation pipeline for generating layered, color-coded, rich-media, and polygon-enhanced KML files with verified real Google Maps photos, live review ratings, and concise summaries.
---

# KML Generation Standard Specification & Rules

Use this skill whenever creating, updating, or enriching KML (`.kml`) map files, interactive map data, and travel itinerary cards for Google My Maps, Leaflet, or GIS applications.

---

## 1. Core Principles & Data Quality Rules

1. **Authentic Google Maps Photos Only**:
   * **Never use generic or mismatched stock photos** (e.g., sports cars for gravity luge carts, dim sum for BBQ clams).
   * Extract high-resolution, user-reviewed or official cover photos directly from Google Maps CDN:
     `https://lh3.googleusercontent.com/gps-cs-s/...=w800-h600-k-no` or `https://lh5.googleusercontent.com/p/...=w800-h600-k-no`.
   * Standardize the dimension parameter to `=w800-h600-k-no` or `=s800` for fast loading and crisp high-DPI display.
   * All image URLs must be validated for `HTTP 200 OK` status before embedding.

2. **Accurate Ratings & Review Counts**:
   * Format: `X.X ★ (N,NNN 則評價) · [分類標籤]`.
   * Keep star ratings and review counts updated from live Google Maps / shared list scrapes.

3. **Concise Summary (精簡重點摘要)**:
   * Each place must have a punchy summary of **20–35 Traditional Chinese characters** focusing on:
     - 🌟 **Unique core experience** (e.g. 俯衝看海、無邊際高空泳池、日洋合璧紅磚官邸).
     - 👶 **Kid/Family highlights** (e.g. 5歲雙人共乘、平緩推車友善、拉絲起司餅).
     - 💡 **Practical tips** (e.g. 免費參觀、近地鐵站、需著泳裝).

4. **Multi-Source Tagging (網紅與共用清單標籤)**:
   * Cross-reference influencer recommendations (e.g. `✨ Liz 曆子推薦`) and family lists (e.g. `👥 老婆地圖清單`).
   * Preserve duplicate points with prominent tag badges (`.showcase-liz-badge`) and dedicated filter tabs in UI.

---

## 2. Document Structure & Standard Header

* **File Format**: Standard XML with UTF-8 encoding.
* **Root Tag**: `<kml xmlns="http://www.opengis.net/kml/2.2">`.
* **Document Metadata**: Must include clean `<name>` and `<description>`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>2026 釜山慶州 7 日親子自由行 實景互動地圖</name>
    <description>整合 Google Maps 真實高熱度照片、星級評分、網紅 Liz 曆子推薦與雙家庭精選行程點位</description>
    ...
  </Document>
</kml>
```

---

## 3. Style Definitions & Category Color Schema

Define reusable `<Style>` blocks in the `<Document>` header. Note that KML colors use **AABBGGRR** hex format (Alpha, Blue, Green, Red).

| Category | Icon Color (KML Hex) | Web Hex | Description | Paddle Icon URL |
| :--- | :--- | :--- | :--- | :--- |
| **🏎️ Adventure / Sports** | `ff3c4ce7` | `#e74c3c` | Red | `http://maps.google.com/mapfiles/kml/paddle/red-blank.png` |
| **🌊 Coastal / Cable Car** | `ffffa800` | `#00a8ff` | Sky Blue | `http://maps.google.com/mapfiles/kml/paddle/blu-blank.png` |
| **🚢 Marine / Museum** | `ffb98029` | `#2980b9` | Ocean Blue | `http://maps.google.com/mapfiles/kml/paddle/blu-circle.png` |
| **🥩 Gourmet / BBQ / Food** | `ff0054d3` | `#d35400` | Deep Orange | `http://maps.google.com/mapfiles/kml/paddle/orange-blank.png` |
| **☕ Cafe / Market / Viral** | `ff227ee6` | `#e67e22` | Amber / Gold | `http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png` |
| **🏯 Culture / History** | `ff60ae27` | `#27ae60` | Emerald Green | `http://maps.google.com/mapfiles/kml/paddle/grn-blank.png` |
| **🏨 Accommodation / Hotel** | `ffad448e` | `#8e44ad` | Purple | `http://maps.google.com/mapfiles/kml/paddle/purple-blank.png` |
| **✨ Influencer Recommended** | `ff5d18be` | `#be185d` | Rose / Pink | `http://maps.google.com/mapfiles/kml/paddle/pink-blank.png` |

---

## 4. Rich Media Placemark Description (`<description>`)

Every `<Placemark>` MUST include an HTML CDATA wrapper (`<![CDATA[ ... ]]>`) with rich media:

1. **Cover Photo (`<img>`)**: Direct Google Maps high-res photo (`w800-h600-k-no`) with rounded corners (`border-radius: 8px`).
2. **Title & Original Name**: Both Traditional Chinese name and original Korean/English name.
3. **Rating & Review Badge**: Real Google Maps star rating, review count, and category label.
4. **Summary & Highlights**: 20–35 character summary + 1 key family highlight tip.

```xml
<Placemark>
  <name>Skyline Luge 釜山斜坡滑車</name>
  <styleUrl>#style-adventure</styleUrl>
  <ExtendedData>
    <Data name="rating"><value>4.5</value></Data>
    <Data name="reviews"><value>5260</value></Data>
    <Data name="category"><value>親子賽車/滑車</value></Data>
    <Data name="isLizRecommended"><value>true</value></Data>
  </ExtendedData>
  <description><![CDATA[
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 340px; padding: 4px;">
  <img src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkoNeDx8Fls38plnfHNp237YxxltEYmW3Zbt43hGYtQonuKTnjBrJPms13e7bgRB0_Jj6ITydxHysFWw-iLywSvFQvLMD7DEbrdviG-J8R6ERkCMqBgHSP96z0qqVFpRGaCaGUX=w800-h600-k-no" 
       style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
  <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">
    Skyline Luge 釜山斜坡滑車 (스카이라인루지 부산)
  </div>
  <div style="font-size: 13px; color: #e67e22; font-weight: 700; margin-bottom: 6px;">
    ★ 4.5 <span style="color: #64748b; font-weight: normal;">(5,260 則評價)</span> · <span style="color: #2563eb;">機張景點</span>
    <span style="background: #fdf2f8; color: #be185d; border: 1px solid #f472b6; font-size: 11px; padding: 1px 6px; border-radius: 10px; margin-left: 4px;">✨ Liz推薦</span>
  </div>
  <div style="font-size: 13px; color: #334155; line-height: 1.45; border-top: 1px solid #e2e8f0; padding-top: 6px;">
    <strong>亮點：</strong>大人可與5歲小孩共乘，搭吊椅上山沿專用賽道俯衝看海，刺激好玩又安全。
  </div>
</div>
  ]]></description>
  <Point>
    <coordinates>129.2136,35.1952,0</coordinates>
  </Point>
</Placemark>
```

---

## 5. Polygon Activity Scope Fill (`<Polygon>`)

Include translucently filled polygons for main travel activity zones:

* **Alpha Transparency**: Set `PolyStyle` color alpha to `45` (~27% opacity) so underlying street names and coastlines remain crisp.
* **Standard Zones**:
  * **🌊 海雲臺觀光海景區**: Sky Blue (`45ff9900`)
  * **🛍️ 西面商圈與美食區**: Orange (`450066ff`)
  * **🏯 慶州歷史古蹟區**: Green (`4500aa33`)
  * **🎡 機張主題樂園區**: Purple (`45aa00aa`)

```xml
<Placemark>
  <name>🌊 海雲臺觀光海景區 (Haeundae Zone)</name>
  <styleUrl>#poly-haeundae</styleUrl>
  <description><![CDATA[<b>核心區域：</b>海雲臺海水浴場、LCT摩天大樓、藍線公園膠囊列車尾浦站。]]></description>
  <Polygon>
    <outerBoundaryIs>
      <LinearRing>
        <coordinates>
          129.1480,35.1680,0
          129.1780,35.1680,0
          129.1780,35.1500,0
          129.1480,35.1500,0
          129.1480,35.1680,0
        </coordinates>
      </LinearRing>
    </outerBoundaryIs>
  </Polygon>
</Placemark>
```

---

## 6. Automation Helper Script (`scripts/scrape_gmaps_kml.py`)

A standardized Python automation script is available in this skill directory to automatically:
1. Search Google Maps via headless Chrome CDP.
2. Extract the exact top review/cover photo (`lh3.googleusercontent.com/gps-cs-s/...=w800-h600-k-no`).
3. Scrape star rating and review counts.
4. Output clean JSON and generate standard compliant `.kml` XML files.
