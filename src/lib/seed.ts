import Deal from "../models/deal.model";
import Product from "../models/product.model"
import { connectDB } from "./db"

const products = [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 3999,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
  },
  {
    name: "USB-C Fast Charging Cable",
    category: "Electronics",
    price: 899,
    imageUrl: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop"
  },
  {
    name: "Portable Phone Charger 20000mAh",
    category: "Electronics",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 1799,
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
  },
  {
    name: "Mechanical Keyboard RGB",
    category: "Electronics",
    price: 5999,
    imageUrl: "https://imgs.search.brave.com/Y_w7eTbK64ca-Kgkfsy8R8ZkF1t9i52O2tgr0tQTO88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/NjA2ODAzODA5Njkt/ZDk3MjdkNDU0NGYy/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjAuMyZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHdhRzkw/Ynkxd1lXZGxmSHg4/ZkdWdWZEQjhmSHg4/ZkE9PQ"
  },
  {
    name: "Smart Watch Fitness Tracker",
    category: "Electronics",
    price: 9999,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
  },
  // Laptops
  {
    name: "Dell XPS 13 Laptop",
    category: "Laptops",
    price: 89999,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop"
},
{
    name: "MacBook Pro 14 Inch",
    category: "Laptops",
    price: 139999,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop"
  },

  // Mobiles
  {
    name: "iPhone 15 Pro Max",
    category: "Mobiles",
    price: 129999,
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop"
  },
  {
    name: "Samsung Galaxy S24",
    category: "Mobiles",
    price: 79999,
    imageUrl: "https://imgs.search.brave.com/pvABLl9Fu0OxCnDhm8H3BH0fy_FDURUfaL_GJIaZaf0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS53aXJlZC5jb20v/cGhvdG9zLzY1YTg2/NDRiNDkwM2M1Njgy/NTM1MjA4OC9tYXN0/ZXIvd18xNjAwLGNf/bGltaXQvZ2FsYXh5/LXMyNHBsdXMtYW1i/ZXJ5ZWxsb3ctZnJv/bnRfSEktU09VUkNF/LVNhbXN1bmcuanBn"
  },
  // Fashion
  {
    name: "Classic Cotton T-Shirt",
    category: "Fashion",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
  },
  {
    name: "Denim Blue Jeans",
    category: "Fashion",
    price: 3999,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop"
  },
  {
    name: "Laptop Bag",
    category: "Fashion",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
  },

  // Home & Kitchen
  {
    name: "Microwave Oven Compact",
    category: "Home & Kitchen",
    price: 6999,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop"
  },
  {
    name: "Chef's Knife 8 Inch",
    category: "Home & Kitchen",
    price: 3299,
    imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop"
  },
  {
    name: "Bamboo Cutting Board Set",
    category: "Home & Kitchen",
    price: 1599,
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop"
  },

  // Sports & Outdoors
  {
    name: "Yoga Mat Premium",
    category: "Sports & Outdoors",
    price: 2799,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop"
  },
  {
    name: "Dumbbells Adjustable 20kg",
    category: "Sports & Outdoors",
    price: 5999,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop"
  },
  {
    name: "Gym Bag Waterproof",
    category: "Sports & Outdoors",
    price: 3599,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
  },
  {
    name: "Nike Running Shoes",
    category: "Sports & Outdoors",
    price: 7499,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
  },

  // Books & Learning
  {
    name: "Atomic Habits Book",
    category: "Books & Learning",
    price: 1199,
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop"
  },
  {
    name: "Python Programming Book",
    category: "Books & Learning",
    price: 2999,
    imageUrl: "https://imgs.search.brave.com/EpzDanrsxOcVjcvlXW9ZJyJyMNYsUKmuf1_Y-Imlqss/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzUxNHk1dHFVdVNM/LmpwZw"
  },

  // Beauty & Personal Care
  {
    name: "Face Moisturizer Cream",
    category: "Beauty & Personal Care",
    price: 1999,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop"
  },
  {
    name: "Shampoo & Conditioner Set",
    category: "Beauty & Personal Care",
    price: 1799,
    imageUrl: "https://imgs.search.brave.com/ZCDSWaS_zdKxCYlSi1Xa0mOqJOin1be4PJ0dRvpS_bY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxTXVYWHVnM3BM/LmpwZw"
  },
  {
    name: "Hair Dryer Professional",
    category: "Beauty & Personal Care",
    price: 5499,
    imageUrl: "https://imgs.search.brave.com/p6q_HmxehL6FVE8Vq6CZ_vQXxwjgnEzy293jdaamORU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/NjczLzMxNC9zbWFs/bC9oYW5kLWhlbGQt/YmxhY2staGFpci1k/cnllci1mb3ItcXVp/Y2stYW5kLWVmZmVj/dGl2ZS1kcnlpbmct/YXQtaG9tZS1vci1z/YWxvbi1waG90by5q/cGVn"
  },

  //deals
  {
    name: "Portable Bluetooth Speaker — 20% Off",
    category: "Electronics",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop"
  },
  {
    name: "Running Shoes — Sport Sale",
    category: "Sports & Outdoors",
    price: 3499,
    imageUrl: "https://imgs.search.brave.com/34oGoOjnKJkhycqHhTv_doADgrvu8rlMNyvZu4ag2NY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mYXNoaW9uLXJ1/bm5pbmctc25lYWtl/ci1zaG9lcy1pc29s/YXRlZC13aGl0ZV80/NzQ2OS00MzguanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw"
  },
  {
    name: "Adjustable Dumbbells 10kg — Fitness Deal",
    category: "Sports & Outdoors",
    price: 2599,
    imageUrl: "https://imgs.search.brave.com/W9wd9ayNhfyX_xsDvztA_dwvB3u89ucLsuk8tBnZVn4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tb250/cmVhbHdlaWdodHMu/Y2EvY2RuL3Nob3Av/cHJvZHVjdHMvNS01/Mk1haW5JbWFnZS5w/bmc_dj0xNzU2NDEz/MTA2JndpZHRoPTUz/Mw"
  },
  {
    name: "Kitchen Utensils — Home & Kitchen Offer",
    category: "Home & Kitchen",
    price: 2199,
    imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&h=500&fit=crop"
  },
  {
    name: "Stainless Steel Water Bottle — Discounted",
    category: "Fitness & Outdoors",
    price: 599,
    imageUrl: "https://imgs.search.brave.com/mMPnclLrnjZarAHDlZ6LputgET_uyOjQzQStrRU7GJg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/a3ViZXJpbmR1c3Ry/aWVzLmNvLmluL3Vw/bG9hZHMva3ViZXJp/bmR1c3RyaWVzL3By/b2R1Y3RzL2t1YmVy/LWluZHVzdHJpZXMt/aW5zdWxhdGVkLXN0/YWlubGVzcy1zdGVl/bC13YXRlci1ib3R0/bGUtNTAwLW1sLS1o/b3QtYW1wLWNvbGQt/dGhlcm1vcy1mbGFz/ay0tdGhlcm1vc3Qt/Mjc1ODgxNTQxMzAx/MTk5OF9tLmpwZz92/PTU3MQ"
  },
  {
    name: "Leather Wallet — Fashion Offer",
    category: "Fashion",
    price: 999,
    imageUrl: "https://imgs.search.brave.com/5fFYuNiCnBqHAVqrub4QSUDxD26JYdCDvDj2snC7Wkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDY1MDM4MjUwMDgt/OTA5YTY3ZTYzYzNk/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1USjhmR3hs/WVhSb1pYSWxNakIz/WVd4c1pYUjhaVzU4/TUh4OE1IeDhmREE9"
  },
  {
    name: "Backpack Travel Bag — Sale Price",
    category: "Fashion",
    price: 1799,
    imageUrl: "https://imgs.search.brave.com/QdNDzeY_a9oT3LMiWzvAIdaJKiNUaZ0rTlhplxnkXs4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/Ny8wOS8xMS80OS90/cmF2ZWwtYmFnLTQz/MjY3MjRfNjQwLmpw/Zw"
  },
  {
    name: "Beginner's Cooking Book — Learning Deal",
    category: "Books & Learning",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&h=500&fit=crop"
  }
]

const deals = [
    {
        productId: "693686ec6cb9f747e988d906",
        dealPrice: 1999
    },
    {
        productId: "693686ec6cb9f747e988d907",
        dealPrice: 2999
    },
    {
        productId: "693686ec6cb9f747e988d908",
        dealPrice: 1999
    },
    {
        productId: "693686ec6cb9f747e988d909",
        dealPrice: 1999
    },
    {
        productId: "693686ec6cb9f747e988d90a",
        dealPrice: 399
    },
    {
        productId: "693686ec6cb9f747e988d90b",
        dealPrice: 699
    },
    {
        productId: "693686ec6cb9f747e988d90c",
        dealPrice: 1499
    },
    {
        productId: "693686ec6cb9f747e988d90d",
        dealPrice: 499
    },

]

const seedProdcuts = async () => {
  await connectDB();
  console.log("Connected to DB");

  try {
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

// seedProdcuts();

const seedDeals = async () => {
    await connectDB()
    console.log("Connected to DB");
    
    try {
        await Deal.insertMany(deals)
        console.log("Seeded Deals");
    } catch (error) {
        console.log("Error in seeding deals");
    }
    finally{
        process.exit(0);
    }
}

seedDeals()