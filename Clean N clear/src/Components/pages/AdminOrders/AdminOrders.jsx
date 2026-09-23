import React, { useEffect, useMemo, useState } from "react";
import "./AdminOrders.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ADMIN_KEY =
  import.meta.env.VITE_ADMIN_KEY || "CNC_ADMIN_2026";

const STATUS_OPTIONS = [
  "New",
  "Processing",
  "Completed",
  "Cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  /* =========================================================
     FETCH ORDERS
     ========================================================= */

  const fetchOrders = async (showRefreshLoader = false) => {
    try {
      setError("");

      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "GET",
        headers: {
          "x-admin-key": ADMIN_KEY,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch orders."
        );
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error("Fetch orders error:", err);

      setError(
        err.message ||
          "Unable to connect to the Clean N Clear backend."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =========================================================
     FILTER ORDERS
     ========================================================= */

  const filteredOrders = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!searchText) {
        return true;
      }

      const customerName =
        order.customer?.name || "";

      const phone =
        order.customer?.phone || "";

      const email =
        order.customer?.email || "";

      const company =
        order.customer?.company || "";

      const location =
        order.customer?.location || "";

      const orderId =
        order.id || "";

      const searchableText = `
        ${orderId}
        ${customerName}
        ${phone}
        ${email}
        ${company}
        ${location}
      `.toLowerCase();

      return searchableText.includes(searchText);
    });
  }, [orders, search, statusFilter]);

  /* =========================================================
     STATISTICS
     ========================================================= */

  const statistics = useMemo(() => {
    return {
      total: orders.length,

      newOrders: orders.filter(
        (order) => order.status === "New"
      ).length,

      processing: orders.filter(
        (order) => order.status === "Processing"
      ).length,

      completed: orders.filter(
        (order) => order.status === "Completed"
      ).length,

      cancelled: orders.filter(
        (order) => order.status === "Cancelled"
      ).length,
    };
  }, [orders]);

  /* =========================================================
     FORMAT DATE
     ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     FORMAT CURRENCY
     ========================================================= */

  const formatCurrency = (value) => {
    const number = Number(value || 0);

    return `₹${number.toLocaleString("en-IN")}`;
  };

  /* =========================================================
     UPDATE STATUS
     ========================================================= */

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!orderId || !newStatus) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${encodeURIComponent(
          orderId
        )}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            "x-admin-key": ADMIN_KEY,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update order status."
        );
      }

      const updatedOrder =
        data.order || data.updatedOrder;

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  updatedOrder?.status ||
                  newStatus,
              }
            : order
        )
      );

      setSelectedOrder((previousOrder) => {
        if (!previousOrder) {
          return previousOrder;
        }

        if (previousOrder.id !== orderId) {
          return previousOrder;
        }

        return {
          ...previousOrder,
          status:
            updatedOrder?.status ||
            newStatus,
        };
      });
    } catch (err) {
      console.error("Update status error:", err);

      setError(
        err.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  /* =========================================================
     OPEN ORDER
     ========================================================= */

  const openOrder = (order) => {
    setSelectedOrder(order);
  };

  /* =========================================================
     CLOSE ORDER
     ========================================================= */

  const closeOrder = () => {
    if (updatingStatus) {
      return;
    }

    setSelectedOrder(null);
  };

  /* =========================================================
     LOADING
     ========================================================= */

  if (loading) {
    return (
      <div className="cnc-admin-page">
        <div className="cnc-admin-loading">
          <div className="cnc-admin-spinner"></div>

          <h2>Loading Orders</h2>

          <p>
            Please wait while we fetch your Clean N Clear
            orders.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <div className="cnc-admin-page">
      <div className="cnc-admin-container">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="cnc-admin-header">

          <div className="cnc-admin-heading">

            <span className="cnc-admin-eyebrow">
              CLEAN N CLEAR
            </span>

            <h1>Orders Dashboard</h1>

            <p>
              Manage and track customer cleaning product
              orders.
            </p>

          </div>

          <button
            type="button"
            className="cnc-admin-refresh"
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
          >
            <span
              className={
                refreshing
                  ? "cnc-admin-refresh-icon cnc-admin-spin"
                  : "cnc-admin-refresh-icon"
              }
            >
              ↻
            </span>

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

        </div>

        {/* =====================================================
            ERROR
            ===================================================== */}

        {error && (
          <div className="cnc-admin-error">
            <span>!</span>

            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {/* =====================================================
            STATISTICS
            ===================================================== */}

        <div className="cnc-admin-stats">

          <div className="cnc-admin-stat-card">

            <div className="cnc-admin-stat-icon">
              #
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{statistics.total}</strong>
            </div>

          </div>

          <div className="cnc-admin-stat-card">

            <div className="cnc-admin-stat-icon">
              N
            </div>

            <div>
              <span>New Orders</span>
              <strong>{statistics.newOrders}</strong>
            </div>

          </div>

          <div className="cnc-admin-stat-card">

            <div className="cnc-admin-stat-icon">
              P
            </div>

            <div>
              <span>Processing</span>
              <strong>{statistics.processing}</strong>
            </div>

          </div>

          <div className="cnc-admin-stat-card">

            <div className="cnc-admin-stat-icon">
              C
            </div>

            <div>
              <span>Completed</span>
              <strong>{statistics.completed}</strong>
            </div>

          </div>

          <div className="cnc-admin-stat-card">

            <div className="cnc-admin-stat-icon">
              X
            </div>

            <div>
              <span>Cancelled</span>
              <strong>{statistics.cancelled}</strong>
            </div>

          </div>

        </div>

        {/* =====================================================
            TOOLBAR
            ===================================================== */}

        <div className="cnc-admin-toolbar">

          <div className="cnc-admin-search">

            <span className="cnc-admin-search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by order ID, name, phone, email..."
            />

            {search && (
              <button
                type="button"
                className="cnc-admin-clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

          <div className="cnc-admin-filter">

            <label htmlFor="cnc-admin-status-filter">
              Status
            </label>

            <select
              id="cnc-admin-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">
                All Orders
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* =====================================================
            ORDER COUNT
            ===================================================== */}

        <div className="cnc-admin-results-info">
          <span>
            Showing{" "}
            <strong>
              {filteredOrders.length}
            </strong>{" "}
            of{" "}
            <strong>
              {orders.length}
            </strong>{" "}
            orders
          </span>
        </div>

        {/* =====================================================
            EMPTY STATE
            ===================================================== */}

        {filteredOrders.length === 0 ? (
          <div className="cnc-admin-empty">

            <div className="cnc-admin-empty-icon">
              🛒
            </div>

            <h2>
              {orders.length === 0
                ? "No Orders Yet"
                : "No Matching Orders"}
            </h2>

            <p>
              {orders.length === 0
                ? "Customer orders will appear here once they are submitted."
                : "Try changing your search or status filter."}
            </p>

            {orders.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </button>
            )}

          </div>
        ) : (

          /* ===================================================
             ORDER TABLE
             =================================================== */

          <div className="cnc-admin-table-card">

            <div className="cnc-admin-table-wrap">

              <table className="cnc-admin-table">

                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredOrders.map((order) => {

                    const productCount =
                      order.items?.reduce(
                        (total, item) =>
                          total +
                          Number(
                            item.quantity || 0
                          ),
                        0
                      ) || 0;

                    return (
                      <tr key={order.id}>

                        {/* ORDER */}

                        <td>
                          <div className="cnc-admin-order-id">
                            {order.id}
                          </div>
                        </td>

                        {/* CUSTOMER */}

                        <td>
                          <div className="cnc-admin-customer">

                            <strong>
                              {order.customer?.name ||
                                "—"}
                            </strong>

                            {order.customer?.company && (
                              <span>
                                {
                                  order.customer
                                    .company
                                }
                              </span>
                            )}

                          </div>
                        </td>

                        {/* CONTACT */}

                        <td>
                          <div className="cnc-admin-contact">

                            <span>
                              {order.customer?.phone ||
                                "—"}
                            </span>

                            {order.customer?.email && (
                              <span>
                                {
                                  order.customer
                                    .email
                                }
                              </span>
                            )}

                          </div>
                        </td>

                        {/* PRODUCTS */}

                        <td>

                          <div className="cnc-admin-products-count">

                            <strong>
                              {productCount}
                            </strong>

                            <span>
                              {productCount === 1
                                ? "item"
                                : "items"}
                            </span>

                          </div>

                        </td>

                        {/* TOTAL */}

                        <td>
                          <strong className="cnc-admin-total">
                            {formatCurrency(
                              order.total
                            )}
                          </strong>
                        </td>

                        {/* DATE */}

                        <td>
                          <span className="cnc-admin-date">
                            {formatDate(
                              order.createdAt
                            )}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={`cnc-admin-status cnc-admin-status-${(
                              order.status ||
                              "New"
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                          >
                            {order.status ||
                              "New"}
                          </span>

                        </td>

                        {/* ACTION */}

                        <td>

                          <button
                            type="button"
                            className="cnc-admin-view-btn"
                            onClick={() =>
                              openOrder(order)
                            }
                          >
                            View
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>

      {/* =======================================================
          ORDER DETAILS MODAL
          ======================================================= */}

      {selectedOrder && (

        <div
          className="cnc-admin-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeOrder();
            }
          }}
        >

          <div className="cnc-admin-modal">

            {/* MODAL HEADER */}

            <div className="cnc-admin-modal-header">

              <div>

                <span className="cnc-admin-modal-label">
                  ORDER DETAILS
                </span>

                <h2>
                  {selectedOrder.id}
                </h2>

                <p>
                  {formatDate(
                    selectedOrder.createdAt
                  )}
                </p>

              </div>

              <button
                type="button"
                className="cnc-admin-modal-close"
                onClick={closeOrder}
                disabled={updatingStatus}
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="cnc-admin-modal-body">

              {/* CUSTOMER */}

              <section className="cnc-admin-detail-section">

                <div className="cnc-admin-section-title">
                  Customer Information
                </div>

                <div className="cnc-admin-detail-grid">

                  <div className="cnc-admin-detail-item">
                    <span>Name</span>
                    <strong>
                      {selectedOrder.customer?.name ||
                        "—"}
                    </strong>
                  </div>

                  <div className="cnc-admin-detail-item">
                    <span>Phone</span>
                    <strong>
                      {selectedOrder.customer?.phone ||
                        "—"}
                    </strong>
                  </div>

                  <div className="cnc-admin-detail-item">
                    <span>Email</span>
                    <strong>
                      {selectedOrder.customer?.email ||
                        "—"}
                    </strong>
                  </div>

                  <div className="cnc-admin-detail-item">
                    <span>Company</span>
                    <strong>
                      {selectedOrder.customer?.company ||
                        "—"}
                    </strong>
                  </div>

                  <div className="cnc-admin-detail-item cnc-admin-detail-full">
                    <span>Location</span>
                    <strong>
                      {selectedOrder.customer?.location ||
                        "—"}
                    </strong>
                  </div>

                </div>

              </section>

              {/* PRODUCTS */}

              <section className="cnc-admin-detail-section">

                <div className="cnc-admin-section-title">
                  Ordered Products
                </div>

                <div className="cnc-admin-items">

                  {selectedOrder.items?.map(
                    (item, index) => (

                      <div
                        className="cnc-admin-item"
                        key={`${item.id}-${index}`}
                      >

                        <div className="cnc-admin-item-info">

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.unit}
                          </span>

                        </div>

                        <div className="cnc-admin-item-qty">
                          × {item.quantity}
                        </div>

                        <div className="cnc-admin-item-price">
                          {formatCurrency(
                            item.subtotal
                          )}
                        </div>

                      </div>

                    )
                  )}

                </div>

                <div className="cnc-admin-grand-total">

                  <span>
                    Order Total
                  </span>

                  <strong>
                    {formatCurrency(
                      selectedOrder.total
                    )}
                  </strong>

                </div>

              </section>

              {/* NOTES */}

              {selectedOrder.notes && (

                <section className="cnc-admin-detail-section">

                  <div className="cnc-admin-section-title">
                    Customer Notes
                  </div>

                  <div className="cnc-admin-notes">
                    {selectedOrder.notes}
                  </div>

                </section>

              )}

              {/* STATUS */}

              <section className="cnc-admin-detail-section">

                <div className="cnc-admin-section-title">
                  Order Status
                </div>

                <div className="cnc-admin-status-control">

                  <select
                    value={
                      selectedOrder.status ||
                      "New"
                    }
                    onChange={(event) =>
                      updateOrderStatus(
                        selectedOrder.id,
                        event.target.value
                      )
                    }
                    disabled={updatingStatus}
                  >

                    {STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}

                  </select>

                  {updatingStatus && (
                    <span>
                      Updating...
                    </span>
                  )}

                </div>

              </section>

            </div>

            {/* MODAL FOOTER */}

            <div className="cnc-admin-modal-footer">

              <button
                type="button"
                className="cnc-admin-close-btn"
                onClick={closeOrder}
                disabled={updatingStatus}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminOrders;