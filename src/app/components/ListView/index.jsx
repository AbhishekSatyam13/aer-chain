import React, { useEffect, useState } from "react";
import { ListViewWrapper } from "./style";
import { Button, Table, Modal, Form, Input, Row, Col, Select, message } from "antd";
import record from "../../../mock/mockData.json";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;

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
  //...................Hooks...................//

  const [isModal, setModal] = useState(false);
  const [mainRecord, setMainRecord] = useState([]);
  const [payload, setPayload] = useState({
    tripId: uuidv4(),
    source: "",
    phoneNumber: "",
    transporter: '',
    dest: '',
  });

  useEffect(() => {
    if (window.localStorage.getItem("tableRecord")) {
      setMainRecord(JSON.parse(localStorage.getItem("tableRecord")));
    } else {
      setMainRecord(record.data);
      localStorage.setItem("tableRecord", JSON.stringify(record.data));
    }
  }, [window]);

  //..........................................//

  const handleChange = (fieldName, event) => {
    setPayload((prevState) => ({
      ...prevState,
      [fieldName]: event.target?.value ?? event
    }));
  };

  const handleSubmit = () => {
    if(Object.values(payload).some(item => !item)){
        message.info("All fields are mandatory");
        return;
    }
    const existingData = JSON.parse(localStorage.getItem('tableRecord'));
    existingData.unshift(payload);
    setMainRecord(existingData);
    message.success("Successfully Added trip!!");
    localStorage.setItem('tableRecord',JSON.stringify(existingData));
  }

  return (
    <ListViewWrapper>
      <header>
        <h3>Trip List</h3>
        <div>
          <Button type="primary" onClick={() => setModal(true)}>
            Add Trip
          </Button>
        </div>
      </header>
      <Table
        dataSource={mainRecord}
        columns={columns}
        rowKey="tripId"
        loading={mainRecord.length < 1}
      />
      <Modal
        title="Add Trip"
        open={isModal}
        width={900}
        footer={[
          <Button onClick={() => setModal(false)} key='cancel'>Cancel</Button>,
          <Button type="primary" onClick={handleSubmit} key='submit'>Add Trip</Button>,
        ]}
        onCancel={() => setModal(false)}
      >
        <Form name="Add trip">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Trip Id" required>
                <Input value={payload.tripId} disabled />
              </Form.Item>
              <Form.Item label="Source" required>
                <Input onChange={(event) => handleChange("source", event)} />
              </Form.Item>
              <Form.Item label="Ph Number" required>
                <Input onChange={(event) => handleChange("phoneNumber", event)}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Transporter" required>
                <Select onChange={(event) => handleChange("transporter", event)}>
                    <Option value="FedEx" key="FedEx">FedEx</Option>
                    <Option value="Bluedart" key="Bluedart">Bluedart</Option>
                    <Option value="DHL" key="DHL">DHL</Option>
                    <Option value="Gati" key="Gati">Gati</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Destination" required>
                <Input onChange={(event) => handleChange("dest", event)}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </ListViewWrapper>
  );
};

export default ListView;
