---
name: kml-generator
description: >-
  Standardized rules and specifications for generating layered, color-coded, rich-media, and polygon-enhanced KML files for travel itineraries and map applications.
---

# KML Generation Standard Specification & Rules

Use this skill whenever creating or updating KML (`.kml`) map files for travel itineraries, GIS visualization, or web interactive map embedding.

---

## 1. Document Structure & Standard Header

* **File Format**: Standard XML with UTF-8 encoding.
* **Root Tag**: `<kml xmlns="http://www.opengis.net/kml/2.2">`.
* **Document Metadata**: Must include clean `<name>` and `<description>`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>地圖名稱</name>
    <description>地圖描述與版號說明</description>
    ...
  </Document>
</kml>
```

---

## 2. Layer Grouping (Folder Hierarchy)

Locations must be organized into logical, independent `<Folder>` elements. Each folder represents an active layer in Google My Maps or web map frameworks.

* **Folder Examples**:
  * 🏯 `慶州歷史文化與街區` (Cultural & Historical)
  * 🌊 `海雲臺海岸線與水樂園` (Coastal & Resorts)
  * 🎡 `釜山特色展覽與主題樂園` (Attractions & Theme Parks)
  * 🗺️ `主要活動區域範圍` (Polygon Activity Scope)

---

## 3. Style Definitions & Color Schema

Define reusable `<Style>` blocks in the `<Document>` header. Note that KML colors use **AABBGGRR** hex format (Alpha, Blue, Green, Red).

### Category Color Reference

| Category | Icon Color (KML Hex) | Opacity | Description | Icon URL |
| :--- | :--- | :--- | :--- | :--- |
| **Cultural / Historic** | `ff00a5ff` | 100% | Amber / Orange | `http://maps.google.com/mapfiles/kml/paddle/orange-blank.png` |
| **Coastal / Sea** | `ffff9900` | 100% | Ocean Blue | `http://maps.google.com/mapfiles/kml/paddle/blu-blank.png` |
| **Attractions / Theme Parks** | `ffff0080` | 100% | Bright Purple | `http://maps.google.com/mapfiles/kml/paddle/purple-blank.png` |
| **Hotels / Accommodations** | `ffb6c1ff` | 100% | Soft Pink | `http://maps.google.com/mapfiles/kml/paddle/pink-blank.png` |
| **Shopping / Dining** | `ff00bb00` | 100% | Vibrant Green | `http://maps.google.com/mapfiles/kml/paddle/grn-blank.png` |

---

## 4. Rich Media Placemark Description (`<description>`)

Every `<Placemark>` MUST include an HTML CDATA wrapper (`<![CDATA[ ... ]]>`) with rich media:

1. **Cover Image (`<img>`)**: High-quality 16:9 photo thumbnail with rounded corners (`border-radius: 8px`).
2. **Rating & Review Badge**: Exact Google Maps rating `4.X ★ (N,NNN 則評價) · [分類標籤]`.
3. **Exact 20-Character Description**: Crisp 20 Traditional Chinese character summary per location (excluding space/punctuation).

```xml
<Placemark>
  <name>景點名稱</name>
  <styleUrl>#attraction-style</styleUrl>
  <description><![CDATA[
<div style="font-family: Arial, sans-serif; padding: 4px;">
  <img src="https://images.unsplash.com/..." style="width: 100%; max-width: 320px; border-radius: 8px; margin-bottom: 8px; height: 160px; object-fit: cover;" />
  <div style="font-size: 15px; font-weight: bold; color: #202124; margin-bottom: 4px;">景點全稱 (原名)</div>
  <div style="font-size: 13px; color: #e67e22; font-weight: bold; margin-bottom: 6px;">
    4.5 <span style="color: #f39c12;">★</span> <span style="color: #70757a; font-weight: normal;">(8,997 則評價)</span> · <span style="color: #1a73e8; font-weight: normal;">旅遊景點</span>
  </div>
  <div style="font-size: 13px; color: #3c4043; line-height: 1.4; border-top: 1px solid #e8eaed; padding-top: 6px;">
    精準二十個字景點亮點敘述與特別注意事項
  </div>
</div>
  ]]></description>
  <Point>
    <coordinates>129.1675,35.1599,0</coordinates>
  </Point>
</Placemark>
```

---

## 5. Polygon Activity Scope Fill (`<Polygon>`)

Include translucently filled polygons for main activity zones:

* **Alpha Transparency**: Set `PolyStyle` color alpha to `45` (~25% opacity) so underlying maps remain visible.
* **Styles**:
  * **Haeundae Zone**: Blue Line & Translucent Fill (`45ff9900`)
  * **Seomyeon Zone**: Orange Line & Translucent Fill (`450066ff`)
  * **Gyeongju Zone**: Green Line & Translucent Fill (`4500aa33`)
  * **Gijang Zone**: Purple Line & Translucent Fill (`45aa00aa`)

```xml
<Placemark>
  <name>🌊 海雲臺觀光海景區 (Haeundae Zone)</name>
  <styleUrl>#poly-haeundae</styleUrl>
  <description><![CDATA[<b>區域重點：</b>海雲臺沙灘、LCT 高空泳池、藍線公園膠囊列車。]]></description>
  <Polygon>
    <outerBoundaryIs>
      <LinearRing>
        <coordinates>
          129.1500,35.1650,0
          129.1750,35.1650,0
          129.1750,35.1520,0
          129.1500,35.1520,0
          129.1500,35.1650,0
        </coordinates>
      </LinearRing>
    </outerBoundaryIs>
  </Polygon>
</Placemark>
```
