import {
  pgTable,
  serial,
  text,
  varchar,
  numeric,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull().default("General"),
  description: text("description").notNull().default(""),
  price: numeric("price", { precision: 10, scale: 2 }).notNull().default("0"),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  badge: varchar("badge", { length: 60 }),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("4.8"),
  reviewsCount: integer("reviews_count").default(0),
  stock: integer("stock").default(50),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 320 }).notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 100 }).default("Pest Tips"),
  author: varchar("author", { length: 120 }).default("ShieldPro Team"),
  readMinutes: integer("read_minutes").default(5),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  location: varchar("location", { length: 150 }).notNull(),
  service: varchar("service", { length: 150 }).notNull(),
  rating: integer("rating").notNull().default(5),
  review: text("review").notNull(),
  verified: boolean("verified").default(true),
  dateStr: varchar("date_str", { length: 60 }).default("Recently"),
  avatarBg: varchar("avatar_bg", { length: 30 }).default("#0e7c6b"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }),
  source: varchar("source", { length: 80 }).default("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: varchar("address", { length: 300 }),
  pestType: varchar("pest_type", { length: 120 }),
  serviceType: varchar("service_type", { length: 120 }),
  preferredDate: varchar("preferred_date", { length: 60 }),
  notes: text("notes"),
  promoCode: varchar("promo_code", { length: 60 }),
  cart: jsonb("cart"),
  status: varchar("status", { length: 40 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Review = typeof reviews.$inferSelect;
