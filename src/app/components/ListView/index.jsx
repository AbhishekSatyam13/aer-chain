import React from "react";
import { ListViewWrapper } from "./style";
import { Button, Table } from "antd";
import record from "../../../mock/mockData.json";

const columns = [
  {
    title: "Trip Id",
    key: "tripId",
    render: (actionIndex) => <a>{actionIndex.tripId}</a>,
  },
  {
    title: "Transporter",
    dataIndex: "transporter",
    key: "transporter",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Destination",
    dataIndex: "dest",
    key: "dest",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "ETA",
    key: "tripEndTime",
    render: (actionIndex) => {
      if (!actionIndex.tripEndTime) return "-";
      const date = new Date(actionIndex.tripEndTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
      const day = date.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      return formattedDate;
    },
  },
  {
    title: "Distance Remaining",
    dataIndex: "distanceRemaining",
    key: "distanceRemaining",
  },
  {
    title: "Current Status",
    dataIndex: "currenStatus",
    key: "currenStatus",
  },
];

const ListView = () => {
  console.log("record here", record);
  return (
    <ListViewWrapper>
      <header>
        <h3>Trip List</h3>
        <div>
          <Button type="primary">Add Trip</Button>
        </div>
      </header>
      <Table dataSource={record.data} columns={columns} rowKey="tripId" />
    </ListViewWrapper>
  );
};

export default ListView;
