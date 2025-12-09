export const parseNlp = (text: string) => {
  const q = text.toLowerCase();

  let intent: "products" | "deals" | "payments" | "orders" | "polite" | "unknown" =
    "unknown";

  // --- Intent Detection ---
  // polite first
  if (
    q.includes("thank") ||
    q.includes("thanks") ||
    q.includes("thx") ||
    q.includes("welcome")
  ) {
    intent = "polite";
  }

  // orders (strong keywords)
  else if (
    q.includes("order") ||
    q.includes("orders") ||
    q.includes("track") ||
    q.includes("tracking") ||
    q.includes("delivery") ||
    q.includes("status") ||
    q.includes("where is my")
  ) {
    intent = "orders";
  }

  else if (q.includes("deal") || q.includes("discount") || q.includes("offer")) {
    intent = "deals";
  }

  else if (
    q.includes("payment") ||
    q.includes("pending") ||
    q.includes("amount") ||
    q.includes("pay")
  ) {
    intent = "payments";
  }

  else {
    intent = "products";
  }

  // --- Price Extraction ---
  const hasAbove = q.includes("above") || q.includes("greater") || q.includes("more");
  const hasBelow = q.includes("below") || q.includes("under") || q.includes("less");

  const numberMatches = [...q.matchAll(/(\d+)\s*(k)?/g)];
  const numbers = numberMatches.map((m) => {
    let num = Number(m[1]);
    if (m[2] === "k") num *= 1000;
    return num;
  });

  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  if (hasAbove && hasBelow && numbers.length >= 2) {
    const first = numbers[0];
    const second = numbers[1];
    if (q.indexOf("above") < q.indexOf("below")) {
      minPrice = first ?? null;
      maxPrice = second ?? null;
    } else {
      minPrice = second ?? null;
      maxPrice = first ?? null;
    }
  } else if (hasAbove && numbers.length >= 1) {
    minPrice = numbers[0] ?? null;
  } else if (hasBelow && numbers.length >= 1) {
    maxPrice = numbers[0] ?? null;
  } else if (numbers.length >= 1) {
    maxPrice = numbers[0] ?? null;
  }

  // --- Category Extraction ---
  const categoryKeywords: Record<string, string[]> = {
    "Beauty & Personal Care": ["beauty", "personal care", "care"],
    "Books & Learning": ["book", "books", "learning"],
    Electronics: ["electronics", "electronic"],
    Fashion: ["fashion", "clothes", "dress", "shirts"],
    "Fitness & Outdoors": ["fitness", "outdoors", "gym"],
    "Home & Kitchen": ["home", "kitchen"],
    Laptops: ["laptop", "laptops"],
    Mobiles: ["mobile", "mobiles", "phone", "phones"],
    "Sports & Outdoors": ["sports", "sport", "outdoor"],
  };

  let category: string | null = null;
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((k) => q.includes(k))) {
      category = cat;
      break;
    }
  }

  return {
    intent,
    category,
    minPrice,
    maxPrice,
  };
};
