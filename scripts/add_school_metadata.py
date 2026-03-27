#!/usr/bin/env python3
"""Extract metadata from school markdown files and add to frontmatter."""

import re
import os
import glob

PREFECTURES = [
    '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県',
    '東京都','神奈川県','千葉県','埼玉県','茨城県','栃木県','群馬県',
    '新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県',
    '大阪府','京都府','兵庫県','奈良県','滋賀県','和歌山県','三重県',
    '鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県',
    '福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
]

REGION_MAP = {
    '北海道': '北海道・東北', '青森県': '北海道・東北', '岩手県': '北海道・東北',
    '宮城県': '北海道・東北', '秋田県': '北海道・東北', '山形県': '北海道・東北', '福島県': '北海道・東北',
    '東京都': '関東', '神奈川県': '関東', '千葉県': '関東', '埼玉県': '関東',
    '茨城県': '関東', '栃木県': '関東', '群馬県': '関東',
    '新潟県': '中部', '富山県': '中部', '石川県': '中部', '福井県': '中部',
    '山梨県': '中部', '長野県': '中部', '岐阜県': '中部', '静岡県': '中部', '愛知県': '中部',
    '大阪府': '関西', '京都府': '関西', '兵庫県': '関西', '奈良県': '関西',
    '滋賀県': '関西', '和歌山県': '関西', '三重県': '関西',
    '鳥取県': '中国・四国', '島根県': '中国・四国', '岡山県': '中国・四国',
    '広島県': '中国・四国', '山口県': '中国・四国', '徳島県': '中国・四国',
    '香川県': '中国・四国', '愛媛県': '中国・四国', '高知県': '中国・四国',
    '福岡県': '九州・沖縄', '佐賀県': '九州・沖縄', '長崎県': '九州・沖縄',
    '熊本県': '九州・沖縄', '大分県': '九州・沖縄', '宮崎県': '九州・沖縄',
    '鹿児島県': '九州・沖縄', '沖縄県': '九州・沖縄',
}

def extract_metadata(body, title):
    # Extract prefecture
    pref = ''
    for p in PREFECTURES:
        if p in body:
            pref = p
            break

    # Extract programs
    programs = []
    if 'PYP' in body:
        programs.append('PYP')
    if 'MYP' in body:
        programs.append('MYP')
    if re.search(r'\bDP\b', body):
        programs.append('DP')
    if re.search(r'\bCP\b', body):
        programs.append('CP')

    # School type
    school_type = 'その他'
    if '一条校' in body:
        school_type = '一条校'
    elif 'International' in body or 'インターナショナル' in body or 'International' in title:
        school_type = 'インター'

    region = REGION_MAP.get(pref, '') if pref else ''

    return pref, region, programs, school_type

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split frontmatter
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False

    frontmatter = parts[1]
    body = parts[2]

    # Skip if already has prefecture
    if 'prefecture:' in frontmatter:
        return False

    # Get title from frontmatter
    title_match = re.search(r'title:\s*"([^"]*)"', frontmatter)
    title = title_match.group(1) if title_match else ''

    pref, region, programs, school_type = extract_metadata(body, title)

    # Build new fields
    programs_str = ', '.join(f'"{p}"' for p in programs)
    new_fields = f'\nprefecture: "{pref}"\nregion: "{region}"\nprograms: [{programs_str}]\nschoolType: "{school_type}"'

    # Insert before closing ---
    new_content = '---' + frontmatter.rstrip() + new_fields + '\n---' + body

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    school_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src', 'content', 'schools')
    files = glob.glob(os.path.join(school_dir, '*.md'))

    updated = 0
    skipped = 0
    stats = {'prefectures': {}, 'regions': {}, 'programs': {}, 'types': {}}

    for filepath in sorted(files):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        parts = content.split('---', 2)
        if len(parts) < 3:
            skipped += 1
            continue

        body = parts[2]
        title_match = re.search(r'title:\s*"([^"]*)"', parts[1])
        title = title_match.group(1) if title_match else ''

        pref, region, programs, school_type = extract_metadata(body, title)

        # Track stats
        if pref:
            stats['prefectures'][pref] = stats['prefectures'].get(pref, 0) + 1
        if region:
            stats['regions'][region] = stats['regions'].get(region, 0) + 1
        for p in programs:
            stats['programs'][p] = stats['programs'].get(p, 0) + 1
        stats['types'][school_type] = stats['types'].get(school_type, 0) + 1

        if process_file(filepath):
            updated += 1
        else:
            skipped += 1

    print(f"Updated: {updated}, Skipped: {skipped}")
    print(f"\nRegion breakdown:")
    for r, c in sorted(stats['regions'].items(), key=lambda x: -x[1]):
        print(f"  {r}: {c}")
    print(f"\nProgram breakdown:")
    for p, c in sorted(stats['programs'].items(), key=lambda x: -x[1]):
        print(f"  {p}: {c}")
    print(f"\nType breakdown:")
    for t, c in sorted(stats['types'].items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")
    print(f"\nPrefectures with no match: {len(files) - sum(stats['prefectures'].values())}")

if __name__ == '__main__':
    main()
