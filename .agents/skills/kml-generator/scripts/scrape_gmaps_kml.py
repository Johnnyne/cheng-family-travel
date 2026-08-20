#!/usr/bin/env python3
"""
Google Maps Scraper & Standard KML Generator
Automates scraping real Google Maps cover/review photos, ratings, and generating KML files.
"""

import asyncio
import json
import os
import re
import subprocess
import time
import urllib.parse
import urllib.request
import websockets

def generate_kml(places, polygons, output_file="travel_map.kml"):
    """Generate a standard-compliant KML file with rich HTML popups, styling, and polygons."""
    kml_parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<kml xmlns="http://www.opengis.net/kml/2.2">',
        '  <Document>',
        '    <name>釜山慶州 實景互動地圖</name>',
        '    <description>整合 Google Maps 真實高熱度照片、星級評分、網紅 Liz 推薦與精選行程點位</description>',
        '',
        '    <!-- Styles -->',
        '    <Style id="style-adventure">',
        '      <IconStyle>',
        '        <color>ff3c4ce7</color>',
        '        <scale>1.1</scale>',
        '        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/red-blank.png</href></Icon>',
        '      </IconStyle>',
        '    </Style>',
        '    <Style id="style-viral">',
        '      <IconStyle>',
        '        <color>ff227ee6</color>',
        '        <scale>1.1</scale>',
        '        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png</href></Icon>',
        '      </IconStyle>',
        '    </Style>',
        '    <Style id="style-food">',
        '      <IconStyle>',
        '        <color>ff0054d3</color>',
        '        <scale>1.1</scale>',
        '        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/orange-blank.png</href></Icon>',
        '      </IconStyle>',
        '    </Style>',
        '    <Style id="style-culture">',
        '      <IconStyle>',
        '        <color>ff60ae27</color>',
        '        <scale>1.1</scale>',
        '        <Icon><href>http://maps.google.com/mapfiles/kml/paddle/grn-blank.png</href></Icon>',
        '      </IconStyle>',
        '    </Style>',
        ''
    ]

    # Places Folder
    kml_parts.append('    <Folder>')
    kml_parts.append('      <name>📍 精選景點與美食 (37大亮點)</name>')
    
    for p in places:
        style_id = "#style-adventure"
        if "烤肉" in p.get("category", "") or "美食" in p.get("category", "") or "鰻魚" in p.get("category", ""):
            style_id = "#style-food"
        elif "文青" in p.get("category", "") or "海景" in p.get("category", ""):
            style_id = "#style-viral"
        elif "古蹟" in p.get("category", "") or "文化" in p.get("category", ""):
            style_id = "#style-culture"

        liz_badge = '<span style="background: #fdf2f8; color: #be185d; border: 1px solid #f472b6; font-size: 11px; padding: 1px 6px; border-radius: 10px; margin-left: 4px;">✨ Liz推薦</span>' if p.get("isLiz") else ''

        desc_html = f'''<div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 320px; padding: 4px;">
  <img src="{p.get('img', '')}" style="width: 100%; height: 160px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
  <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">{p['name']}</div>
  <div style="font-size: 13px; color: #e67e22; font-weight: 700; margin-bottom: 6px;">
    ★ {p.get('rating', '4.5')} <span style="color: #64748b; font-weight: normal;">({p.get('reviews', '1,000')} 則評價)</span> · <span style="color: #2563eb;">{p.get('category', '景點')}</span>
    {liz_badge}
  </div>
  <div style="font-size: 13px; color: #334155; line-height: 1.45; border-top: 1px solid #e2e8f0; padding-top: 6px;">
    {p.get('desc', '')}
  </div>
</div>'''

        kml_parts.extend([
            '      <Placemark>',
            f'        <name>{p["name"]}</name>',
            f'        <styleUrl>{style_id}</styleUrl>',
            f'        <description><![CDATA[{desc_html}]]></description>',
            '        <Point>',
            f'          <coordinates>{p["lon"]},{p["lat"]},0</coordinates>',
            '        </Point>',
            '      </Placemark>'
        ])
    kml_parts.append('    </Folder>')

    # Polygons Folder
    if polygons:
        kml_parts.append('    <Folder>')
        kml_parts.append('      <name>🗺️ 主要活動區域範圍</name>')
        for idx, poly in enumerate(polygons):
            style_id = f"poly-style-{idx}"
            kml_parts.extend([
                f'      <Style id="{style_id}">',
                '        <LineStyle><color>ff2980b9</color><width>2</width></LineStyle>',
                '        <PolyStyle><color>45ff9900</color><fill>1</fill><outline>1</outline></PolyStyle>',
                '      </Style>',
                '      <Placemark>',
                f'        <name>{poly["name"]}</name>',
                f'        <styleUrl>#{style_id}</styleUrl>',
                '        <Polygon>',
                '          <outerBoundaryIs>',
                '            <LinearRing>',
                '              <coordinates>'
            ])
            coords_str = ' '.join(f'{pt[1]},{pt[0]},0' for pt in poly['coords'])
            kml_parts.append(f'                {coords_str}')
            kml_parts.extend([
                '              </coordinates>',
                '            </LinearRing>',
                '          </outerBoundaryIs>',
                '        </Polygon>',
                '      </Placemark>'
            ])
        kml_parts.append('    </Folder>')

    kml_parts.extend([
        '  </Document>',
        '</kml>'
    ])

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(kml_parts))
    print(f"KML successfully exported to {output_file}")

if __name__ == "__main__":
    print("KML Automation Module Ready.")
