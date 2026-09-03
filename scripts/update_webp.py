#!/usr/bin/env python3
"""
Update all HTML files to use WebP images with <picture> elements.
"""
import os
import re
from pathlib import Path

PUBLIC_DIR = Path("/Users/majidghafouri/speechify/landing/public")

def update_service_page(filepath):
    """Update a service page HTML file."""
    content = filepath.read_text()
    
    # Find the service image name from og:image
    og_match = re.search(r'og:image" content="https://amatisberry\.ir/assets/images/svc/([^"]+)\.jpg', content)
    if not og_match:
        return False
    
    img_name = og_match.group(1)
    webp_name = f"{img_name}.webp"
    jpg_name = f"{img_name}.jpg"
    
    # 1. Update the split-media img tag to use <picture>
    old_img = f'<img src="assets/images/svc/{jpg_name}" alt="{img_name.replace("-", " ").title()}" width="1200" height="800" loading="lazy">'
    new_picture = f'<picture><source srcset="assets/images/svc/{webp_name}" type="image/webp"><img src="assets/images/svc/{jpg_name}" alt="{img_name.replace("-", " ").title()}" width="1200" height="800" loading="lazy"></picture>'
    
    if old_img in content:
        content = content.replace(old_img, new_picture)
    else:
        # Try alternative patterns
        patterns = [
            f'<img src="assets/images/svc/{jpg_name}" alt="[^"]*" width="1200" height="800" loading="lazy">',
            f'<img src="assets/images/svc/{jpg_name}" alt="[^"]*" width="1200" height="800">',
        ]
        for pattern in patterns:
            content = re.sub(pattern, new_picture, content)
    
    # 2. Update og:image to use .webp (social platforms support webp now)
    content = content.replace(
        f'og:image" content="https://amatisberry.ir/assets/images/svc/{jpg_name}"',
        f'og:image" content="https://amatisberry.ir/assets/images/svc/{webp_name}"'
    )
    content = content.replace(
        f'twitter:image" content="https://amatisberry.ir/assets/images/svc/{jpg_name}"',
        f'twitter:image" content="https://amatisberry.ir/assets/images/svc/{webp_name}"'
    )
    
    # 3. Update video poster to use hero-image.webp
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_index_page(filepath):
    """Update index.html - already has webp for hero and news, but check for others."""
    content = filepath.read_text()
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    # Update og:image and twitter:image for index
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_blogs_page(filepath):
    """Update blogs.html."""
    content = filepath.read_text()
    
    # Update og:image and twitter:image
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_connect_page(filepath):
    """Update connect-with-us.html."""
    content = filepath.read_text()
    
    # Update og:image and twitter:image
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_showcase_page(filepath):
    """Update showcase.html - has PNG images."""
    content = filepath.read_text()
    
    # Convert PNG images to WebP picture elements
    # heartlung.png
    content = content.replace(
        '<img src="assets/images/showcase/heartlung.png" alt="HeartLung — AI Cardiovascular Diagnostics">',
        '<picture><source srcset="assets/images/showcase/heartlung.webp" type="image/webp"><img src="assets/images/showcase/heartlung.png" alt="HeartLung — AI Cardiovascular Diagnostics"></picture>'
    )
    
    # figureforge.png
    content = content.replace(
        '<img src="assets/images/showcase/figureforge.png" alt="FigureForge — Collectible Figures Store">',
        '<picture><source srcset="assets/images/showcase/figureforge.webp" type="image/webp"><img src="assets/images/showcase/figureforge.png" alt="FigureForge — Collectible Figures Store"></picture>'
    )
    
    filepath.write_text(content)
    return True

def update_web_design_page(filepath):
    """Update web-design.html - uses service-1.jpg."""
    content = filepath.read_text()
    
    old_img = '<img src="assets/images/service-1.jpg" alt="Web Design" width="1000" height="563" loading="lazy">'
    new_picture = '<picture><source srcset="assets/images/service-1.webp" type="image/webp"><img src="assets/images/service-1.jpg" alt="Web Design" width="1000" height="563" loading="lazy"></picture>'
    
    content = content.replace(old_img, new_picture)
    
    # Update og:image and twitter:image if they exist
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/service-1.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/service-1.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/service-1.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/service-1.webp"'
    )
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_what_we_offer_page(filepath):
    """Update what-we-offer.html - uses our-service-1.png."""
    content = filepath.read_text()
    
    old_img = '<img src="assets/images/our-service-1.png" alt="Our Services">'
    new_picture = '<picture><source srcset="assets/images/our-service-1.webp" type="image/webp"><img src="assets/images/our-service-1.png" alt="Our Services"></picture>'
    
    content = content.replace(old_img, new_picture)
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_who_are_we_page(filepath):
    """Update who-are-we.html - uses about.jpg."""
    content = filepath.read_text()
    
    old_img = '<img src="assets/images/about.jpg" alt="Who Are We">'
    new_picture = '<picture><source srcset="assets/images/about.webp" type="image/webp"><img src="assets/images/about.jpg" alt="Who Are We"></picture>'
    
    content = content.replace(old_img, new_picture)
    
    # Update og:image and twitter:image if they exist
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/about.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/about.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/about.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/about.webp"'
    )
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_pricing_page(filepath):
    """Update pricing.html."""
    content = filepath.read_text()
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    # Update og:image and twitter:image if they exist
    content = content.replace(
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'og:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    content = content.replace(
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.jpg"',
        'twitter:image" content="https://amatisberry.ir/assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def update_other_pages(filepath):
    """Update other pages that might have video posters."""
    content = filepath.read_text()
    
    # Update video poster
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    
    filepath.write_text(content)
    return True

def main():
    updated = 0
    
    # Service pages (in svc folder)
    svc_pages = [
        "airdrop-platform.html", "android-app.html", "book-reader-app.html",
        "book-reader-website.html", "classifieds-app.html", "classifieds-website.html",
        "corporate-website.html", "crypto-exchange.html", "crypto-payment-gateway.html",
        "dashboards-admin.html", "dex.html", "ecommerce-app.html", "exchange-app.html",
        "flight-hotel-app.html", "ios-app.html", "maintenance-support.html",
        "marketplace-website.html", "medical-website.html", "news-website.html",
        "online-store.html", "otc-exchange.html", "p2p-exchange.html",
        "restaurant-website.html", "seo-marketing.html", "shopify-store.html",
        "smart-contracts.html", "subscription-store.html", "taxi-app.html",
        "tourism-app.html", "tourism-website.html", "uiux-design.html",
        "web-app-pwa.html", "wordpress.html"
    ]
    
    for page in svc_pages:
        filepath = PUBLIC_DIR / page
        if filepath.exists():
            if update_service_page(filepath):
                updated += 1
                print(f"Updated: {page}")
    
    # Special pages
    if (PUBLIC_DIR / "index.html").exists():
        update_index_page(PUBLIC_DIR / "index.html")
        updated += 1
        print("Updated: index.html")
    
    if (PUBLIC_DIR / "blogs.html").exists():
        update_blogs_page(PUBLIC_DIR / "blogs.html")
        updated += 1
        print("Updated: blogs.html")
    
    if (PUBLIC_DIR / "connect-with-us.html").exists():
        update_connect_page(PUBLIC_DIR / "connect-with-us.html")
        updated += 1
        print("Updated: connect-with-us.html")
    
    if (PUBLIC_DIR / "showcase.html").exists():
        update_showcase_page(PUBLIC_DIR / "showcase.html")
        updated += 1
        print("Updated: showcase.html")
    
    if (PUBLIC_DIR / "web-design.html").exists():
        update_web_design_page(PUBLIC_DIR / "web-design.html")
        updated += 1
        print("Updated: web-design.html")
    
    if (PUBLIC_DIR / "what-we-offer.html").exists():
        update_what_we_offer_page(PUBLIC_DIR / "what-we-offer.html")
        updated += 1
        print("Updated: what-we-offer.html")
    
    if (PUBLIC_DIR / "who-are-we.html").exists():
        update_who_are_we_page(PUBLIC_DIR / "who-are-we.html")
        updated += 1
        print("Updated: who-are-we.html")
    
    if (PUBLIC_DIR / "pricing.html").exists():
        update_pricing_page(PUBLIC_DIR / "pricing.html")
        updated += 1
        print("Updated: pricing.html")
    
    # Other pages with video posters
    other_pages = [
        "admin.html", "android-app.html", "book-reader-app.html",
        "book-reader-website.html", "classifieds-app.html", "classifieds-website.html",
        "corporate-website.html", "crypto-exchange.html", "crypto-payment-gateway.html",
        "dashboards-admin.html", "dex.html", "ecommerce-app.html", "exchange-app.html",
        "flight-hotel-app.html", "ios-app.html", "maintenance-support.html",
        "marketplace-website.html", "medical-website.html", "news-website.html",
        "online-store.html", "otc-exchange.html", "p2p-exchange.html",
        "restaurant-website.html", "seo-marketing.html", "shopify-store.html",
        "smart-contracts.html", "subscription-store.html", "taxi-app.html",
        "tourism-app.html", "tourism-website.html", "uiux-design.html",
        "web-app-pwa.html", "wordpress.html"
    ]
    
    for page in other_pages:
        filepath = PUBLIC_DIR / page
        if filepath.exists():
            update_other_pages(filepath)
    
    print(f"\nTotal files updated: {updated}")

if __name__ == "__main__":
    main()