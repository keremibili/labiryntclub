#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# id -> (pl, en, ru, es, uk) — ingredients + character
D = {
    "c-gin-tonic": (
        "Gordon’s gin, Kinley tonic · orzeźwiający, wytrawny, lekko gorzki",
        "Gordon’s gin, Kinley tonic · crisp, dry, lightly bitter",
        "Джин Gordon’s, тоник Kinley · освежающий, сухой, слегка горький",
        "Ginebra Gordon’s, tónica Kinley · fresco, seco, ligeramente amargo",
        "Джин Gordon’s, тонік Kinley · освіжаючий, сухий, злегка гіркий",
    ),
    "c-cuba-libre": (
        "Biały rum, Coca-Cola, limonka · słodki, cytrusowy, lekki",
        "White rum, Coca-Cola, lime · sweet, citrusy, easy-drinking",
        "Белый ром, Coca-Cola, лайм · сладкий, цитрусовый, лёгкий",
        "Ron blanco, Coca-Cola, lima · dulce, cítrico, fácil de beber",
        "Білий ром, Coca-Cola, лайм · солодкий, цитрусовий, легкий",
    ),
    "c-tequila-sunrise": (
        "Tequila Don Diego, sok pomarańczowy, grenadyna · słodki, owocowy, klasyczny",
        "Don Diego tequila, orange juice, grenadine · sweet, fruity, classic",
        "Текила Don Diego, апельсиновый сок, гренадин · сладкий, фруктовый, классика",
        "Tequila Don Diego, zumo de naranja, granadina · dulce, afrutado, clásico",
        "Текіла Don Diego, апельсиновий сік, гренадин · солодкий, фруктовий, класика",
    ),
    "c-blue-lagoon": (
        "Wódka, Blue Curaçao, Sprite · słodki, cytrusowy, orzeźwiający",
        "Vodka, Blue Curaçao, Sprite · sweet, citrusy, refreshing",
        "Водка, Blue Curaçao, Sprite · сладкий, цитрусовый, освежающий",
        "Vodka, Blue Curaçao, Sprite · dulce, cítrico, refrescante",
        "Горілка, Blue Curaçao, Sprite · солодкий, цитрусовий, освіжаючий",
    ),
    "c-jagerbomb": (
        "Jägermeister, Burn energy · mocny ziołowy kick, energetyczny",
        "Jägermeister, Burn energy · bold herbal kick, high-energy",
        "Jägermeister, Burn · мощный травяной удар, энергичный",
        "Jägermeister, Burn · golpe herbal intenso, energético",
        "Jägermeister, Burn · потужний трав’яний удар, енергійний",
    ),
    "c-mojito": (
        "Biały rum, Sprite, mięta, limonka, syrop · świeży, miętowy, cytrusowy",
        "White rum, Sprite, mint, lime, syrup · fresh, minty, citrus",
        "Белый ром, Sprite, мята, лайм, сироп · свежий, мятный, цитрусовый",
        "Ron blanco, Sprite, menta, lima, jarabe · fresco, mentolado, cítrico",
        "Білий ром, Sprite, м’ята, лайм, сироп · свіжий, м’ятний, цитрусовий",
    ),
    "c-pina-colada": (
        "Biały rum, Malibu, ananas, mleko · kremowy, tropikalny, słodki",
        "White rum, Malibu, pineapple, milk · creamy, tropical, sweet",
        "Белый ром, Malibu, ананас, молоко · кремовый, тропический, сладкий",
        "Ron blanco, Malibu, piña, leche · cremoso, tropical, dulce",
        "Білий ром, Malibu, ананас, молоко · кремовий, тропічний, солодкий",
    ),
    "c-sex-on-the-beach": (
        "Wódka, likier brzoskwiniowy, pomarańcza, żurawina · słodki, owocowy",
        "Vodka, peach liqueur, orange, cranberry · sweet, fruity",
        "Водка, персиковый ликёр, апельсин, клюква · сладкий, фруктовый",
        "Vodka, licor de melocotón, naranja, arándano · dulce, afrutado",
        "Горілка, персиковий лікер, апельсин, журавлина · солодкий, фруктовий",
    ),
    "c-jungle-juice": (
        "Rum, wódka, mix soków · owocowy, łatwy w piciu, partyowy",
        "Rum, vodka, mixed juices · fruity, easy-drinking, party vibe",
        "Ром, водка, микс соков · фруктовый, лёгкий, вечериночный",
        "Ron, vodka, mix de zumos · afrutado, fácil, estilo fiesta",
        "Ром, горілка, мікс соків · фруктовий, легкий, вечіркова атмосфера",
    ),
    "c-zombie": (
        "Biały i ciemny rum, mix soków, grenadyna · mocniejszy, tropikalny, słodko-owocowy",
        "Light & dark rum, mixed juices, grenadine · stronger, tropical, sweet-fruity",
        "Светлый и тёмный ром, микс соков, гренадин · крепче, тропический, сладко-фруктовый",
        "Ron claro y oscuro, zumos, granadina · más fuerte, tropical, dulce-afrutado",
        "Світлий і темний ром, мікс соків, гренадин · міцніший, тропічний, солодко-фруктовий",
    ),
    "c-white-russian": (
        "Wódka, Kahlúa, mleko · kremowy, kawowy, aksamitny",
        "Vodka, Kahlúa, milk · creamy, coffee-forward, smooth",
        "Водка, Kahlúa, молоко · кремовый, кофейный, бархатный",
        "Vodka, Kahlúa, leche · cremoso, a café, suave",
        "Горілка, Kahlúa, молоко · кремовий, кавовий, оксамитовий",
    ),
    "c-lynchburg-lemonade": (
        "Jameson, likier pomarańczowy, cytryna, Sprite · cytrusowy, lekko słodki, orzeźwiający",
        "Jameson, orange liqueur, lemon, Sprite · citrusy, lightly sweet, refreshing",
        "Jameson, апельсиновый ликёр, лимон, Sprite · цитрусовый, слегка сладкий, освежающий",
        "Jameson, licor de naranja, limón, Sprite · cítrico, ligeramente dulce, refrescante",
        "Jameson, апельсиновий лікер, лимон, Sprite · цитрусовий, злегка солодкий, освіжаючий",
    ),
    "c-cosmopolitan": (
        "Wódka, Triple Sec, żurawina, limonka · wytrawno-owocowy, elegancki, lekko kwaśny",
        "Vodka, Triple Sec, cranberry, lime · dry-fruity, elegant, lightly tart",
        "Водка, Triple Sec, клюква, лайм · сухо-фруктовый, элегантный, слегка кислый",
        "Vodka, Triple Sec, arándano, lima · seco-afrutado, elegante, ligeramente ácido",
        "Горілка, Triple Sec, журавлина, лайм · сухо-фруктовий, елегантний, злегка кислий",
    ),
    "c-margarita": (
        "Tequila Don Diego, Triple Sec, limonka · kwaśny, wytrawny, intensywny",
        "Don Diego tequila, Triple Sec, lime · sour, dry, bold",
        "Текила Don Diego, Triple Sec, лайм · кислый, сухой, яркий",
        "Tequila Don Diego, Triple Sec, lima · ácido, seco, intenso",
        "Текіла Don Diego, Triple Sec, лайм · кислий, сухий, насичений",
    ),
    "c-aperol-spritz": (
        "Aperol, Prosecco, woda gazowana, pomarańcza · gorzko-słodki, musujący, lekki",
        "Aperol, Prosecco, soda, orange · bitter-sweet, sparkling, light",
        "Aperol, Prosecco, газировка, апельсин · горько-сладкий, игристый, лёгкий",
        "Aperol, Prosecco, soda, naranja · agridulce, espumoso, ligero",
        "Aperol, Prosecco, газована вода, апельсин · гірко-солодкий, ігристий, легкий",
    ),
    "c-jager-mojito": (
        "Jägermeister, Sprite, mięta, limonka · ziołowy, miętowy, świeży z mocą",
        "Jägermeister, Sprite, mint, lime · herbal, minty, fresh with a kick",
        "Jägermeister, Sprite, мята, лайм · травяной, мятный, свежий с силой",
        "Jägermeister, Sprite, menta, lima · herbal, mentolado, fresco con fuerza",
        "Jägermeister, Sprite, м’ята, лайм · трав’яний, м’ятний, свіжий з силою",
    ),
    "c-caipirinha": (
        "Cachaça, limonka, cukier · kwaśno-słodki, surowy, brazylijski klasyk",
        "Cachaça, lime, sugar · sweet-sour, rustic, Brazilian classic",
        "Кашаса, лайм, сахар · кисло-сладкий, грубоватый, бразильская классика",
        "Cachaça, lima, azúcar · agridulce, rústico, clásico brasileño",
        "Кашаса, лайм, цукор · кисло-солодкий, брутальний, бразильська класика",
    ),
    "c-bahama-mama": (
        "Ciemny rum, Malibu, pomarańcza, ananas, grenadyna · tropikalny, słodki, bogaty",
        "Dark rum, Malibu, orange, pineapple, grenadine · tropical, sweet, rich",
        "Тёмный ром, Malibu, апельсин, ананас, гренадин · тропический, сладкий, насыщенный",
        "Ron oscuro, Malibu, naranja, piña, granadina · tropical, dulce, intenso",
        "Темний ром, Malibu, апельсин, ананас, гренадин · тропічний, солодкий, насичений",
    ),
    "c-vodka-sour": (
        "Wódka Żubrówka, sok z cytryny, syrop · kwaśny, czysty, zrównoważony",
        "Żubrówka vodka, lemon juice, syrup · sour, clean, balanced",
        "Водка Żubrówka, лимонный сок, сироп · кислый, чистый, сбалансированный",
        "Vodka Żubrówka, limón, jarabe · ácido, limpio, equilibrado",
        "Горілка Żubrówka, лимонний сік, сироп · кислий, чистий, збалансований",
    ),
    "c-whiskey-sour": (
        "Grant’s whiskey, cytryna, syrop · kwaśny, whiskey-forward, klasyczny",
        "Grant’s whiskey, lemon, syrup · sour, whiskey-forward, classic",
        "Виски Grant’s, лимон, сироп · кислый, с характером виски, классика",
        "Whisky Grant’s, limón, jarabe · ácido, con carácter de whisky, clásico",
        "Віскі Grant’s, лимон, сироп · кислий, з характером віскі, класика",
    ),
    "c-gin-sour": (
        "Gordon’s gin, cytryna, syrop · kwaśny, botaniczny, orzeźwiający",
        "Gordon’s gin, lemon, syrup · sour, botanical, refreshing",
        "Джин Gordon’s, лимон, сироп · кислый, ботанический, освежающий",
        "Ginebra Gordon’s, limón, jarabe · ácido, botánico, refrescante",
        "Джин Gordon’s, лимон, сироп · кислий, ботанічний, освіжаючий",
    ),
    "c-long-island-ice-tea": (
        "Wódka, gin, rum, tequila, Coca-Cola · bardzo mocny, klasyczny party bomb",
        "Vodka, gin, rum, tequila, Coca-Cola · very strong, classic party bomb",
        "Водка, джин, ром, текила, Coca-Cola · очень крепкий, классическая бомба",
        "Vodka, ginebra, ron, tequila, Coca-Cola · muy fuerte, bomba clásica",
        "Горілка, джин, ром, текіла, Coca-Cola · дуже міцний, класична бомба",
    ),
    "c-brazilian-julep": (
        "Cachaça, Jim Beam, mięta, cytryna · mocny, miętowy, intensywny",
        "Cachaça, Jim Beam, mint, lemon · strong, minty, intense",
        "Кашаса, Jim Beam, мята, лимон · крепкий, мятный, интенсивный",
        "Cachaça, Jim Beam, menta, limón · fuerte, mentolado, intenso",
        "Кашаса, Jim Beam, м’ята, лимон · міцний, м’ятний, інтенсивний",
    ),
    "c-bob-marley": (
        "Malibu, ananas, grenadyna, Blue Curaçao · kolorowy, tropikalny, słodki",
        "Malibu, pineapple, grenadine, Blue Curaçao · colourful, tropical, sweet",
        "Malibu, ананас, гренадин, Blue Curaçao · яркий, тропический, сладкий",
        "Malibu, piña, granadina, Blue Curaçao · colorido, tropical, dulce",
        "Malibu, ананас, гренадин, Blue Curaçao · яскравий, тропічний, солодкий",
    ),
    "c-spring-paradise": (
        "Ciemny rum Barceló, Amaretto, cytryna, Blue Curaçao · owocowo-migdałowy, świeży",
        "Barceló dark rum, Amaretto, lemon, Blue Curaçao · fruity-almond, fresh",
        "Тёмный ром Barceló, Amaretto, лимон, Blue Curaçao · фруктово-миндальный, свежий",
        "Ron oscuro Barceló, Amaretto, limón, Blue Curaçao · afrutado-almendra, fresco",
        "Темний ром Barceló, Amaretto, лимон, Blue Curaçao · фруктово-мигдальний, свіжий",
    ),
    "c-green-oasis": (
        "Finlandia vodka, ananas, Blue Curaçao, cytryna · tropikalny, cytrusowy, orzeźwiający",
        "Finlandia vodka, pineapple, Blue Curaçao, lemon · tropical, citrusy, refreshing",
        "Водка Finlandia, ананас, Blue Curaçao, лимон · тропический, цитрусовый, освежающий",
        "Vodka Finlandia, piña, Blue Curaçao, limón · tropical, cítrico, refrescante",
        "Горілка Finlandia, ананас, Blue Curaçao, лимон · тропічний, цитрусовий, освіжаючий",
    ),
    "c-melon-sunset": (
        "Biały rum, likier melonowy, pomarańcza, ananas, grenadyna · słodki, melonowy, tropikalny",
        "White rum, melon liqueur, orange, pineapple, grenadine · sweet, melon, tropical",
        "Белый ром, дынный ликёр, апельсин, ананас, гренадин · сладкий, дынный, тропический",
        "Ron blanco, licor de melón, naranja, piña, granadina · dulce, melón, tropical",
        "Білий ром, динний лікер, апельсин, ананас, гренадин · солодкий, динний, тропічний",
    ),
    "c-screwdriver-blue": (
        "Finlandia vodka, pomarańcza, Blue Curaçao, Sprite · owocowy, lekko słodki, orzeźwiający",
        "Finlandia vodka, orange, Blue Curaçao, Sprite · fruity, lightly sweet, refreshing",
        "Водка Finlandia, апельсин, Blue Curaçao, Sprite · фруктовый, слегка сладкий, освежающий",
        "Vodka Finlandia, naranja, Blue Curaçao, Sprite · afrutado, ligeramente dulce, refrescante",
        "Горілка Finlandia, апельсин, Blue Curaçao, Sprite · фруктовий, злегка солодкий, освіжаючий",
    ),
    "c-tropical-red-bull": (
        "Sok pomarańczowy, Red Bull, ananas · bezalkoholowy, energetyczny, tropikalny",
        "Orange juice, Red Bull, pineapple · non-alcoholic, energetic, tropical",
        "Апельсиновый сок, Red Bull, ананас · безалкогольный, энергичный, тропический",
        "Zumo de naranja, Red Bull, piña · sin alcohol, energético, tropical",
        "Апельсиновий сік, Red Bull, ананас · безалкогольний, енергійний, тропічний",
    ),
    "c-red-bull-mojito": (
        "Red Bull, woda gazowana, mięta, limonka, syrop · energetyczny, miętowy, świeży",
        "Red Bull, soda, mint, lime, syrup · energetic, minty, fresh",
        "Red Bull, газировка, мята, лайм, сироп · энергичный, мятный, свежий",
        "Red Bull, soda, menta, lima, jarabe · energético, mentolado, fresco",
        "Red Bull, газована вода, м’ята, лайм, сироп · енергійний, м’ятний, свіжий",
    ),
    "c-pineapple-mint-red-bull": (
        "Red Bull, ananas, mięta · energetyczny, tropikalny, miętowy",
        "Red Bull, pineapple, mint · energetic, tropical, minty",
        "Red Bull, ананас, мята · энергичный, тропический, мятный",
        "Red Bull, piña, menta · energético, tropical, mentolado",
        "Red Bull, ананас, м’ята · енергійний, тропічний, м’ятний",
    ),
    "c-apple-red-bull": (
        "Sok jabłkowy Cappy, Red Bull, cytryna · energetyczny, jabłkowy, lekko kwaśny",
        "Cappy apple juice, Red Bull, lemon · energetic, apple-forward, lightly tart",
        "Яблочный сок Cappy, Red Bull, лимон · энергичный, яблочный, слегка кислый",
        "Zumo de manzana Cappy, Red Bull, limón · energético, a manzana, ligeramente ácido",
        "Яблучний сік Cappy, Red Bull, лимон · енергійний, яблучний, злегка кислий",
    ),
    "c-kamikaze-x4": (
        "Wódka, Triple Sec, Blue Curaçao, limonka · kwaśny shot, cytrusowy, mocny (x4)",
        "Vodka, Triple Sec, Blue Curaçao, lime · sour shot, citrusy, strong (x4)",
        "Водка, Triple Sec, Blue Curaçao, лайм · кислый шот, цитрусовый, крепкий (x4)",
        "Vodka, Triple Sec, Blue Curaçao, lima · chupito ácido, cítrico, fuerte (x4)",
        "Горілка, Triple Sec, Blue Curaçao, лайм · кислий шот, цитрусовий, міцний (x4)",
    ),
    "c-b-52": (
        "Likier kawowy, Irish cream, likier pomarańczowy · słodki warstwowy shot, kremowy",
        "Coffee liqueur, Irish cream, orange liqueur · sweet layered shot, creamy",
        "Кофейный ликёр, Irish cream, апельсиновый ликёр · сладкий слоёный шот, кремовый",
        "Licor de café, Irish cream, licor de naranja · chupito dulce en capas, cremoso",
        "Кавовий лікер, Irish cream, апельсиновий лікер · солодкий шаруватий шот, кремовий",
    ),
    "c-baby-guinnes": (
        "Likier kawowy, Irish cream · słodki, kawowo-kremowy mini Guinness",
        "Coffee liqueur, Irish cream · sweet, coffee-cream mini Guinness",
        "Кофейный ликёр, Irish cream · сладкий, кофейно-сливочный мини Guinness",
        "Licor de café, Irish cream · dulce, café-crema estilo mini Guinness",
        "Кавовий лікер, Irish cream · солодкий, кавово-вершковий міні Guinness",
    ),
    "c-slippery-nipple": (
        "Sambuca, Irish cream · anyżowo-kremowy, słodki shot",
        "Sambuca, Irish cream · anise-cream, sweet shot",
        "Самбука, Irish cream · анисово-сливочный, сладкий шот",
        "Sambuca, Irish cream · anís-crema, chupito dulce",
        "Самбука, Irish cream · анісово-вершковий, солодкий шот",
    ),
    "c-malibu-shot": (
        "Malibu, sok ananasowy · kokosowo-ananasowy, słodki, lekki",
        "Malibu, pineapple juice · coconut-pineapple, sweet, light",
        "Malibu, ананасовый сок · кокосово-ананасовый, сладкий, лёгкий",
        "Malibu, zumo de piña · coco-piña, dulce, ligero",
        "Malibu, ананасовий сік · кокосово-ананасовий, солодкий, легкий",
    ),
    "c-absinthe-sugar-flame": (
        "Absynt, kostka cukru · bardzo mocny, anyżowy, flambé",
        "Absinthe, sugar cube · very strong, anise, flambé",
        "Абсент, кубик сахара · очень крепкий, анисовый, flambé",
        "Absenta, terrón de azúcar · muy fuerte, anís, flambé",
        "Абсент, кубик цукру · дуже міцний, анісовий, flambé",
    ),
    "c-hiroshima": (
        "Sambuca, Baileys, absynt, grenadyna · mocny warstwowy shot, intensywny",
        "Sambuca, Baileys, absinthe, grenadine · strong layered shot, intense",
        "Самбука, Baileys, абсент, гренадин · крепкий слоёный шот, интенсивный",
        "Sambuca, Baileys, absenta, granadina · chupito fuerte en capas, intenso",
        "Самбука, Baileys, абсент, гренадин · міцний шаруватий шот, інтенсивний",
    ),
    "c-redhead-slut": (
        "Jägermeister, likier brzoskwiniowy, żurawina · ziołowo-owocowy, słodko-gorzki shot",
        "Jägermeister, peach liqueur, cranberry · herbal-fruity, bittersweet shot",
        "Jägermeister, персиковый ликёр, клюква · травяно-фруктовый, горько-сладкий шот",
        "Jägermeister, licor de melocotón, arándano · herbal-afrutado, agridulce",
        "Jägermeister, персиковий лікер, журавлина · трав’яно-фруктовий, гірко-солодкий шот",
    ),
}


def esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def desc_line(langs: tuple[str, str, str, str, str]) -> str:
    return (
        "        description: n("
        f"{esc(langs[0])}, {esc(langs[1])}, {esc(langs[2])}, {esc(langs[3])}, {esc(langs[4])}"
        "),\n"
    )


def patch_menu_ts() -> None:
    path = ROOT / "src/data/menu.ts"
    text = path.read_text()
    missing = []
    for item_id, langs in D.items():
        block_pat = re.compile(
            rf'(id: "{re.escape(item_id)}",\n(?:[^\n]*\n)*?)(      \}},)',
            re.M,
        )
        m = block_pat.search(text)
        if not m:
            missing.append(item_id)
            continue
        block = m.group(1)
        if "description:" in block:
            continue
        insert = desc_line(langs)
        # Prefer after image; else after prices
        if "image:" in block:
            text = text[: m.start(2)] + insert + text[m.start(2) :]
        else:
            text = text[: m.start(2)] + insert + text[m.start(2) :]
    path.write_text(text)
    print("menu.ts descriptions:", text.count("description:"))
    if missing:
        print("MISSING ids:", missing)


def sync_json_files() -> None:
    menu_ids = set(D)
    # Update default-content and live CMS payload from menu categories after TS compile is hard;
    # instead patch JSON categories by id.
    for rel in ["api/_lib/default-content.json"]:
        path = ROOT / rel
        data = json.loads(path.read_text())
        count = 0
        for cat in data.get("categories", []):
            for item in cat.get("items", []):
                if item["id"] in D:
                    pl, en, ru, es, uk = D[item["id"]]
                    item["description"] = {
                        "pl": pl,
                        "en": en,
                        "ru": ru,
                        "es": es,
                        "uk": uk,
                    }
                    count += 1
        data["version"] = int(data.get("version") or 1) + 1
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print(rel, "patched", count)

    # Also write /tmp for CMS upload
    cms_path = Path("/tmp/mf_content_with_desc.json")
    # Prefer live CMS if available else default
    try:
        import urllib.request

        raw = urllib.request.urlopen(
            "https://cdpfbnthap6gtj3h.public.blob.vercel-storage.com/cms/site-content.json"
        ).read()
        content = json.loads(raw)
    except Exception:
        content = json.loads((ROOT / "api/_lib/default-content.json").read_text())

    count = 0
    for cat in content.get("categories", []):
        for item in cat.get("items", []):
            if item["id"] in menu_ids:
                pl, en, ru, es, uk = D[item["id"]]
                item["description"] = {
                    "pl": pl,
                    "en": en,
                    "ru": ru,
                    "es": es,
                    "uk": uk,
                }
                count += 1
    content["version"] = int(content.get("version") or 1) + 1
    from datetime import datetime, timezone

    content["updatedAt"] = datetime.now(timezone.utc).isoformat()
    cms_path.write_text(json.dumps(content, ensure_ascii=False, indent=2))
    print("CMS payload", count, "->", cms_path)


if __name__ == "__main__":
    assert len(D) == 40, len(D)
    patch_menu_ts()
    sync_json_files()
