#!/usr/bin/env python3
"""
Apply all Lighthouse fixes to all HTML pages.
"""
import re
from pathlib import Path

PUBLIC_DIR = Path("/Users/majidghafouri/speechify/landing/public")

def fix_css_link(content):
    """Update CSS link to use minified version with preload."""
    # Replace the old CSS link pattern
    old_pattern = r'<link rel="stylesheet" href="assets/css/style\.css">'
    new_link = '''<link rel="preload" as="style" href="assets/css/style.min.css" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="assets/css/style.min.css"></noscript>'''
    content = re.sub(old_pattern, new_link, content)
    return content

def fix_footer_heading_hierarchy(content):
    """Fix footer heading hierarchy - change h4 to h3, add sr-only h2."""
    # Add sr-only h2 before footer grid
    content = re.sub(
        r'(<footer class="site-footer">\s*<div class="container-page">\s*)(<div class="footer-grid">)',
        r'\1<h2 class="sr-only" data-i18n="footer.heading">Footer Navigation</h2>\n      \2',
        content
    )
    # Change footer h4 to h3
    content = re.sub(r'<h4 data-i18n="footer\.colServices">', '<h3 data-i18n="footer.colServices">', content)
    content = re.sub(r'<h4 data-i18n="footer\.colCompany">', '<h3 data-i18n="footer.colCompany">', content)
    content = re.sub(r'<h4 data-i18n="footer\.colContact">', '<h3 data-i18n="footer.colContact">', content)
    return content

def fix_marquee_contrast(content):
    """Fix marquee contrast by increasing opacity."""
    content = re.sub(
        r'color: var\(--text\);\s*opacity: 0\.14;',
        'color: var(--text);\n  opacity: 0.22;',
        content
    )
    content = re.sub(
        r'\.marquee-2 \.marquee-item \{\s*color: var\(--primary\);\s*opacity: 0\.16;\s*\}',
        '.marquee-2 .marquee-item {\n  color: var(--text);\n  opacity: 0.22;\n}',
        content
    )
    return content

def fix_definition_lists(content):
    """Fix definition list structure - ensure dt/dd inside dl."""
    # Fix kv lists
    content = re.sub(
        r'(<dl class="kv">\s*)<div class="kv-row"><b data-i18n="([^"]+)">([^<]+)</b><span data-i18n="([^"]+)">([^<]+)</span></div>',
        r'\1<div class="kv-row"><dt><b data-i18n="\2">\3</b></dt><dd><span data-i18n="\4">\5</span></dd></div>',
        content
    )
    # Fix multiple kv-row entries
    content = re.sub(
        r'<div class="kv-row"><b data-i18n="([^"]+)">([^<]+)</b><span data-i18n="([^"]+)">([^<]+)</span></div>',
        r'<div class="kv-row"><dt><b data-i18n="\1">\2</b></dt><dd><span data-i18n="\3">\4</span></dd></div>',
        content
    )
    return content

def add_aria_labels_to_service_images(content):
    """Add aria-labels to service page images."""
    # Find service page images and add aria-label to the parent link
    pattern = r'(<div class="split-media reveal">)<picture><source srcset="assets/images/svc/([^"]+)\.webp" type="image/webp"><img src="assets/images/svc/[^"]+\.jpg" alt="([^"]+)" width="1200" height="800" loading="lazy"></picture></div>'
    def replace(match):
        full = match.group(0)
        img_name = match.group(2)
        alt_text = match.group(3)
        # Add aria-label to the picture's parent link if it exists
        # The structure is: <div class="split-media reveal"><picture>...</picture></div>
        # We need to wrap the picture in an <a> with aria-label if not already wrapped
        return f'<div class="split-media reveal"><a href="#" aria-label="{alt_text}"><picture><source srcset="assets/images/svc/{img_name}.webp" type="image/webp"><img src="assets/images/svc/{img_name}.jpg" alt="{alt_text}" width="1200" height="800" loading="lazy"></picture></a></div>'
    
    # Actually, the service pages already have the image inside split-media without a link
    # Let's just add aria-label to the img itself
    content = re.sub(
        r'(<div class="split-media reveal">)<picture><source srcset="assets/images/svc/([^"]+)\.webp" type="image/webp"><img src="assets/images/svc/[^"]+\.jpg" alt="([^"]+)" width="1200" height="800" loading="lazy"></picture></div>',
        r'\1<picture><source srcset="assets/images/svc/\2.webp" type="image/webp"><img src="assets/images/svc/\2.jpg" alt="\3" width="1200" height="800" loading="lazy" aria-label="\3"></picture></div>',
        content
    )
    return content

def fix_video_poster(content):
    """Fix video poster to use webp."""
    content = content.replace(
        'poster="assets/images/hero-image.jpg"',
        'poster="assets/images/hero-image.webp"'
    )
    return content

def process_file(filepath):
    """Process a single HTML file."""
    content = filepath.read_text()
    original = content
    
    # Apply fixes
    content = fix_css_link(content)
    content = fix_footer_heading_hierarchy(content)
    content = fix_marquee_contrast(content)
    content = fix_definition_lists(content)
    content = fix_video_poster(content)
    
    if content != original:
        filepath.write_text(content)
        return True
    return False

def main():
    html_files = list(PUBLIC_DIR.glob("*.html"))
    updated = 0
    
    for filepath in html_files:
        if process_file(filepath):
            updated += 1
            print(f"Updated: {filepath.name}")
    
    print(f"\nTotal files updated: {updated}")

if __name__ == "__main__":
    main()