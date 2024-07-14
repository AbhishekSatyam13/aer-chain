"use client";
import React from "react";
import Header from "./components/Header";
import { Layout } from "../app/dashboard/style";
import { CardOne, CardTwo, CardThree } from "./components/Card";
import ListView from "./components/ListView";

const Dashboard = () => {
  return (
    <Layout>
      <Header />
      <div id="main-content">
        <div className="card-section">
          <CardOne title="Total trips" value="18,033" />
          <CardTwo title="Delivered" value="18,033" />
          <CardThree title="Delayed" value="18,033" />
        </div>
        <ListView />
      </div>
    </Layout>
  );
};

export default Dashboard;
