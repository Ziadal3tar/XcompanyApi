import mongoose from "mongoose";
import userModel from "./DB/model/user.model.js";
import servicesModel from "./DB/model/services.model.js";
import clientsModel from "./DB/model/clients.model.js";
import ordersModel from "./DB/model/orders.model.js";
import bcrypt from "bcryptjs";
/* ================= CONNECT ================= */
await mongoose.connect('mongodb+srv://ZiadAlmorsy:00241300@cluster0.mjwgrkh.mongodb.net/Company');
console.log("DB Connected 🚀");

/* ================= CLEAR OLD DATA ================= */
await Promise.all([
  servicesModel.deleteMany({}),
  clientsModel.deleteMany({}),
  userModel.deleteMany({}),
  ordersModel.deleteMany({})
]);

/* ================= SERVICES ================= */
const services = await servicesModel.insertMany([
  {
    servicesName: "Web Development",
    slug: "web-development",
    servicesBrief: "Modern scalable apps",
    servicesDescription: "Fullstack apps using Angular & Node",
    servicesPrice: 800,
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Angular", "Node"],
    features: [
      { title: "Fast", description: "Optimized apps" },
      { title: "Responsive", description: "Mobile first" }
    ]
  },
  {
    servicesName: "UI/UX Design",
    slug: "ui-ux",
    servicesBrief: "Clean UI",
    servicesDescription: "Modern UX design",
    servicesPrice: 500,
    category: "Design",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
  },
  {
    servicesName: "SEO",
    slug: "seo",
    servicesBrief: "Rank higher",
    servicesDescription: "SEO optimization",
    servicesPrice: 300,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    servicesName: "Mobile Apps",
    slug: "mobile",
    servicesBrief: "iOS & Android",
    servicesDescription: "Cross platform apps",
    servicesPrice: 1200,
    category: "Development",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    servicesName: "Branding",
    slug: "branding",
    servicesBrief: "Brand identity",
    servicesDescription: "Logo & brand design",
    servicesPrice: 400,
    category: "Design",
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702"
  },
  {
    servicesName: "Social Media",
    slug: "social",
    servicesBrief: "Grow online",
    servicesDescription: "Social media marketing",
    servicesPrice: 350,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    servicesName: "E-commerce",
    slug: "ecommerce",
    servicesBrief: "Online stores",
    servicesDescription: "Complete shop systems",
    servicesPrice: 900,
    category: "Development",
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a"
  },
  {
    servicesName: "Content Creation",
    slug: "content",
    servicesBrief: "Creative content",
    servicesDescription: "Video & posts",
    servicesPrice: 250,
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    servicesName: "Cloud Setup",
    slug: "cloud",
    servicesBrief: "Deploy apps",
    servicesDescription: "AWS & servers",
    servicesPrice: 600,
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
  },
  {
    servicesName: "Analytics",
    slug: "analytics",
    servicesBrief: "Data insights",
    servicesDescription: "Dashboards & reports",
    servicesPrice: 450,
    category: "Data",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  }
]);

/* ================= USERS ================= */
const users = await userModel.insertMany(
  await Promise.all(
    Array.from({ length: 40 }).map(async (_, i) => {

      // const hashedPassword = await bcrypt.hash("123456", 10);
const hashedPassword = bcrypt.hashSync('123456', 8);
      return {
        userName: `User${i + 1}`,
        email: `user${i + 1}@mail.com`,
        password: hashedPassword,
confirmEmail:true,
        role: i % 6 === 0
          ? "Admin"
          : "User"
      };
    })
  )
);

/* ================= CLIENTS ================= */
const clients = await clientsModel.insertMany(
  Array.from({ length: 25 }).map((_, i) => {
    const service = services[i % services.length];

    return {
      clientName: `Client ${i + 1}`,
      industry: ["E-commerce", "Tech", "Startup", "Finance"][i % 4],
      logo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

      description: `Client ${i + 1} uses ${service.servicesName}`,

      servicesUsed: [
        {
          serviceId: service._id,
          serviceName: service.servicesName
        }
      ],

      stats: {
        projectsDone: 5 + i,
        growth: `+${10 + i}%`,
        duration: `${2 + i} months`
      },

      projects: [
        {
          title: `${service.servicesName} Project`,
          description: `Project using ${service.servicesName}`,
          images: [
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          ],
          results: [
            { label: "Growth", value: `+${20 + i}%` },
            { label: "Users", value: `${1000 + i * 200}` }
          ]
        }
      ],

      testimonial: {
        text: "Great service and amazing results!",
        author: `Client ${i + 1}`,
        position: "CEO"
      }
    };
  })
);

/* ================= ORDERS ================= */
await ordersModel.insertMany(
  users.map((user, i) => {
    const service = services[i % services.length];

    return {
      clientId: user._id,

      // ✅ المهم هنا
      service: service._id,

      status: ["Done", "In progress", "Canceled"][i % 3],
      createdAt: new Date(Date.now() - i * 86400000)
    };
  })
);

console.log("🔥 FULL Seed inserted successfully");
process.exit();