import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ======================================================
// APP
// ======================================================

const app = express();

const PORT = process.env.PORT || 5000;

const ADMIN_KEY =
  process.env.ADMIN_KEY || "CNC_ADMIN_2026";

// ======================================================
// PATHS
// ======================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDirectory = path.join(
  __dirname,
  "..",
  "data"
);

const ordersFile = path.join(
  dataDirectory,
  "orders.json"
);

// ======================================================
// CREATE DATA DIRECTORY
// ======================================================

try {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, {
      recursive: true,
    });
  }

  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(
      ordersFile,
      "[]",
      "utf8"
    );
  }

  console.log("Orders file:", ordersFile);
} catch (error) {
  console.error(
    "Unable to create orders storage:",
    error
  );
}

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: true,
    methods: [
      "GET",
      "POST",
      "PATCH",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "x-admin-key",
    ],
  })
);

app.use(express.json());

// ======================================================
// PRODUCT CATALOG
// ======================================================

const products = {
  "bachelor-survival-kit": {
    name: "Bachelor Survival Kit",
    price: 499,
    unit: "Kit",
  },

  "carpetpro-cleaner": {
    name: "CarpetPro Cleaner iCapsol RM 768",
    price: 2850,
    unit: "10 L",
  },

  "detergent-powder": {
    name: "Detergent Powder",
    price: 180,
    unit: "Pack",
  },

  "dishwash-gel": {
    name: "Dishwash Gel 500ml X 4",
    price: 320,
    unit: "Pack",
  },

  "lavenderfresh-floor-cleaner": {
    name: "Lavenderfresh Floor Cleaner 1L X 4",
    price: 480,
    unit: "Pack",
  },

  "multi-purpose-cleaner": {
    name: "Multi Purpose Cleaner",
    price: 275,
    unit: "Unit",
  },

  "pressurepro-acidic": {
    name: "PressurePro Active Cleaner - Acidic RM 25",
    price: 2200,
    unit: "10 L",
  },

  "pressurepro-neutral": {
    name: "PressurePro Active Cleaner - Neutral RM 55",
    price: 2350,
    unit: "10 L",
  },

  "pressurepro-oil-grease": {
    name: "PressurePro Oil and Grease Cleaner Extra RM 31",
    price: 28500,
    unit: "200 L",
  },

  "stain-remover": {
    name: "Stain Remover",
    price: 350,
    unit: "Unit",
  },

  "taski-sani-100": {
    name: "TASKI Sani 100 Pur-Eco W1b",
    price: 1650,
    unit: "6 x 0.75 L",
  },

  "toilet-cleaner": {
    name: "Toilet Cleaner Liquid - Reva Bio Clean",
    price: 240,
    unit: "Unit",
  },
};

// ======================================================
// READ ORDERS
// ======================================================

function readOrders() {
  try {
    if (!fs.existsSync(ordersFile)) {
      fs.writeFileSync(
        ordersFile,
        "[]",
        "utf8"
      );

      return [];
    }

    const fileContent = fs.readFileSync(
      ordersFile,
      "utf8"
    );

    if (!fileContent.trim()) {
      return [];
    }

    const orders = JSON.parse(
      fileContent
    );

    if (!Array.isArray(orders)) {
      return [];
    }

    return orders;
  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "READ ORDERS ERROR"
    );
    console.error(
      "======================================"
    );
    console.error(
      "Message:",
      error.message
    );
    console.error(
      "Stack:",
      error.stack
    );
    console.error(
      "File:",
      ordersFile
    );
    console.error(
      "======================================"
    );

    throw error;
  }
}

// ======================================================
// SAVE ORDERS
// ======================================================

function saveOrders(orders) {
  try {
    fs.writeFileSync(
      ordersFile,
      JSON.stringify(
        orders,
        null,
        2
      ),
      "utf8"
    );
  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "SAVE ORDERS ERROR"
    );
    console.error(
      "======================================"
    );
    console.error(
      "Message:",
      error.message
    );
    console.error(
      "Stack:",
      error.stack
    );
    console.error(
      "File:",
      ordersFile
    );
    console.error(
      "======================================"
    );

    throw error;
  }
}

// ======================================================
// HEALTH CHECK
// ======================================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Clean N Clear backend is running",
      storage:
        "Backend/data/orders.json",
      email: false,
      payment: false,
    });
  }
);

// ======================================================
// CREATE ORDER
// ======================================================

app.post(
  "/api/order",
  (req, res) => {
    try {
      console.log("");
      console.log(
        "======================================"
      );
      console.log(
        "NEW ORDER REQUEST"
      );
      console.log(
        "======================================"
      );

      console.log(
        "Request body:"
      );

      console.log(
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      const {
        customer,
        items,
        notes,
      } = req.body || {};

      // ==================================================
      // CUSTOMER VALIDATION
      // ==================================================

      if (!customer) {
        return res.status(400).json({
          success: false,
          message:
            "Customer details are required.",
        });
      }

      if (
        typeof customer.name !==
          "string" ||
        !customer.name.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Customer name is required.",
        });
      }

      if (
        typeof customer.phone !==
          "string" ||
        !customer.phone.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number is required.",
        });
      }

      if (
        typeof customer.location !==
          "string" ||
        !customer.location.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Location is required.",
        });
      }

      // ==================================================
      // EMAIL VALIDATION
      // ==================================================

      if (
        customer.email &&
        customer.email.trim()
      ) {
        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
          !emailRegex.test(
            customer.email.trim()
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Please enter a valid email address.",
          });
        }
      }

      // ==================================================
      // ITEMS VALIDATION
      // ==================================================

      if (
        !Array.isArray(items) ||
        items.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Your order is empty.",
        });
      }

      console.log(
        "Items received:",
        items.length
      );

      // ==================================================
      // BUILD FINAL ITEMS
      // ==================================================

      const finalItems = [];

      for (const item of items) {
        console.log(
          "Checking product:",
          item?.id
        );

        if (!item?.id) {
          return res.status(400).json({
            success: false,
            message:
              "A product ID is missing.",
          });
        }

        const product =
          products[item.id];

        if (!product) {
          console.error(
            "PRODUCT NOT FOUND:",
            item.id
          );

          console.error(
            "Available product IDs:",
            Object.keys(products)
          );

          return res.status(400).json({
            success: false,
            message:
              `Invalid product ID: ${item.id}`,
          });
        }

        const quantity =
          Number(item.quantity);

        if (
          !Number.isInteger(
            quantity
          ) ||
          quantity < 1
        ) {
          return res.status(400).json({
            success: false,
            message:
              `Invalid quantity for ${product.name}.`,
          });
        }

        const subtotal =
          product.price * quantity;

        finalItems.push({
          id: item.id,

          name: product.name,

          price: product.price,

          unit: product.unit,

          quantity,

          subtotal,
        });
      }

      // ==================================================
      // CALCULATE TOTAL
      // ==================================================

      const total =
        finalItems.reduce(
          (sum, item) =>
            sum + item.subtotal,
          0
        );

      console.log(
        "Calculated total:",
        total
      );

      // ==================================================
      // CREATE ORDER ID
      // ==================================================

      const orderId =
        `CNC-${Date.now()
          .toString()
          .slice(-8)}`;

      // ==================================================
      // CREATE ORDER
      // ==================================================

      const order = {
        id: orderId,

        createdAt:
          new Date().toISOString(),

        status: "New",

        customer: {
          name:
            customer.name.trim(),

          phone:
            customer.phone.trim(),

          email:
            customer.email?.trim() ||
            "",

          company:
            customer.company?.trim() ||
            "",

          location:
            customer.location.trim(),
        },

        items: finalItems,

        notes:
          typeof notes === "string"
            ? notes.trim()
            : "",

        total,
      };

      console.log(
        "Order created:",
        orderId
      );

      // ==================================================
      // READ EXISTING ORDERS
      // ==================================================

      const orders =
        readOrders();

      console.log(
        "Existing orders:",
        orders.length
      );

      // ==================================================
      // ADD NEW ORDER
      // ==================================================

      orders.unshift(order);

      // ==================================================
      // SAVE ORDER
      // ==================================================

      saveOrders(orders);

      console.log(
        "Order saved successfully."
      );

      console.log(
        "Saved file:",
        ordersFile
      );

      console.log(
        "======================================"
      );

      // ==================================================
      // SUCCESS
      // ==================================================

      return res.status(201).json({
        success: true,

        message:
          "Order submitted successfully.",

        orderId,

        total,
      });
    } catch (error) {
      console.error("");
      console.error(
        "======================================"
      );
      console.error(
        "ORDER ERROR"
      );
      console.error(
        "======================================"
      );

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "Stack:",
        error?.stack
      );

      console.error(
        "======================================"
      );

      return res.status(500).json({
        success: false,

        message:
          error?.message ||
          "Unable to save the order.",

        error:
          process.env.NODE_ENV ===
          "production"
            ? undefined
            : error?.stack,
      });
    }
  }
);

// ======================================================
// GET ALL ORDERS
// ADMIN ONLY
// ======================================================

app.get(
  "/api/orders",
  (req, res) => {
    try {
      const adminKey =
        req.headers["x-admin-key"];

      if (
        adminKey !== ADMIN_KEY
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized.",
        });
      }

      const orders =
        readOrders();

      return res.json({
        success: true,
        orders,
      });
    } catch (error) {
      console.error(
        "GET ORDERS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to load orders.",
      });
    }
  }
);

// ======================================================
// GET SINGLE ORDER
// ADMIN ONLY
// ======================================================

app.get(
  "/api/orders/:orderId",
  (req, res) => {
    try {
      const adminKey =
        req.headers["x-admin-key"];

      if (
        adminKey !== ADMIN_KEY
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized.",
        });
      }

      const orders =
        readOrders();

      const order =
        orders.find(
          (item) =>
            item.id ===
            req.params.orderId
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      return res.json({
        success: true,
        order,
      });
    } catch (error) {
      console.error(
        "GET SINGLE ORDER ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to load order.",
      });
    }
  }
);

// ======================================================
// UPDATE ORDER STATUS
// ADMIN ONLY
// ======================================================

app.patch(
  "/api/orders/:orderId/status",
  (req, res) => {
    try {
      const adminKey =
        req.headers["x-admin-key"];

      if (
        adminKey !== ADMIN_KEY
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Unauthorized.",
        });
      }

      const { status } =
        req.body || {};

      const allowedStatuses = [
        "New",
        "Processing",
        "Completed",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order status.",
        });
      }

      const orders =
        readOrders();

      const orderIndex =
        orders.findIndex(
          (order) =>
            order.id ===
            req.params.orderId
        );

      if (
        orderIndex === -1
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found.",
        });
      }

      orders[
        orderIndex
      ].status = status;

      orders[
        orderIndex
      ].updatedAt =
        new Date().toISOString();

      saveOrders(orders);

      return res.json({
        success: true,

        message:
          "Order status updated.",

        order:
          orders[
            orderIndex
          ],
      });
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to update order status.",
      });
    }
  }
);

// ======================================================
// API 404
// ======================================================

app.use(
  "/api",
  (req, res) => {
    return res.status(404).json({
      success: false,
      message:
        "API endpoint not found.",
    });
  }
);

// ======================================================
// GENERAL ERROR HANDLER
// ======================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "GENERAL SERVER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error.",
    });
  }
);

// ======================================================
// START SERVER
// ======================================================

app.listen(
  PORT,
  () => {
    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      "       CLEAN N CLEAR BACKEND"
    );
    console.log(
      "======================================"
    );
    console.log(
      `Server: http://localhost:${PORT}`
    );
    console.log(
      `Health: http://localhost:${PORT}/api/health`
    );
    console.log(
      "Orders: Backend/data/orders.json"
    );
    console.log(
      "Email: DISABLED"
    );
    console.log(
      "Payment: DISABLED"
    );
    console.log(
      "======================================"
    );
    console.log("");
  }
);