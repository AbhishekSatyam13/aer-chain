import React, {useEffect, useState } from "react";
import { ListViewWrapper } from "./style";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Tag
} from "antd";
import record from "../../../mock/mockData.json";
import { v4 as uuidv4 } from "uuid";
import placesData from "../../../mock/mockPlaces.json";

const { Option } = Select;

const INITIAL_STATE = {
  tripId: -1,
  source: "",
  phoneNumber: "",
  transporter: "",
  dest: "",
  currenStatus: "Booked",
};

const ListView = () => {
  //...................Hooks...................//

  const [isModal, setModal] = useState(false);
  const [mainRecord, setMainRecord] = useState([]);
  const [payload, setPayload] = useState(INITIAL_STATE);

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
      [fieldName]: event.target?.value ?? event,
    }));
  };

  const handleSubmit = () => {
    if(!payload.source || !payload.transporter || !payload.dest || !payload.phoneNumber){
        message.info("All fields are mandatory");
      return;
    }
    const existingData = JSON.parse(localStorage.getItem("tableRecord"));
    if (payload.trip === -1) {
      //creating new
      existingData.unshift({ ...payload, tripId: uuidv4() });
      message.success("Successfully Added trip!!");
      localStorage.setItem("tableRecord", JSON.stringify(existingData));
    } else {
      //updating status
        const findIndex = existingData.findIndex(item => item.tripId === payload.tripId);
        existingData[findIndex].currenStatus = payload.currenStatus;
    }
    setMainRecord(existingData);

    setModal(false);
  };

  const columns = [
    {
      title: "Trip Id",
      key: "tripId",
      render: (actionIndex) => <a>{actionIndex.tripId}</a>,
      align: 'center'
    },
    {
      title: "Transporter",
      dataIndex: "transporter",
      key: "transporter",
      align: 'center'
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      filters: placesData.places,
      sorter: (a, b) => a.source.length - b.source.length,
      onFilter: (value, record) => record.source.startsWith(value),
      filterSearch: true,
      align: 'center'
    },
    {
      title: "Destination",
      dataIndex: "dest",
      key: "dest",
      filters: placesData.places,
      onFilter: (value, record) => record.source.startsWith(value),
      align: 'center'
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: 'center'
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
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
    {
      title: "Distance Remaining",
      dataIndex: "distanceRemaining",
      key: "distanceRemaining",
      align: 'center'
    },
    {
      title: "Current Status",
      dataIndex: "currenStatus",
      key: "currenStatus",
      align: 'center'
    },
    {
        title: "TAT status",
        key: "tat",
        align: 'center',
        render: (actionIndex) => {
            if(actionIndex.etaDays < 1) return <Tag>Others</Tag>
            const diff = (new Date(actionIndex.lastPingTime) - new Date(actionIndex.createdAt))/(1000*60*60*24)
            if(diff > actionIndex.etaDays) return <Tag color="red">Delayed</Tag>;
            return <Tag color="green">On time</Tag>
        }
      },
    {
      title: "Action",
      key: "action",
      align: 'center',
      render: (actionIndex) => (
        <Button
          type="primary"
          onClick={() => {
            setPayload(actionIndex);
            setModal(true);
          }}
        >
          Update Status
        </Button>
      ),
    },
  ];

  const handleAdd = () => {
    setPayload({ ...INITIAL_STATE });
    setModal(true);
  };

  return (
    <ListViewWrapper>
      <header>
        <h3>Trip List</h3>
        <div>
          <Button type="primary" onClick={handleAdd}>
            {payload.tripId === -1 ? 'Add Trip' : 'Update Status'}
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
        title={payload.tripId === -1 ? "Add Trip" : "Update Status"}
        open={isModal}
        width={900}
        footer={[
          <Button onClick={() => setModal(false)} key="cancel">
            Cancel
          </Button>,
          <Button type="primary" onClick={handleSubmit} key="submit">
            {payload.tripId === -1 ? "Add Trip" : "Update Status"}
          </Button>,
        ]}
        onCancel={() => setModal(false)}
      >
        <Form name="form trip">
          <Row gutter={24}>
            <Col span={12}>
              {/* <Form.Item label="Trip Id" required>
                <Input value={payload.tripId} disabled />
              </Form.Item> */}
              <Form.Item label="Source" required>
                <Input
                  onChange={(event) => handleChange("source", event)}
                  value={payload.source}
                />
              </Form.Item>
              <Form.Item label="Ph Number" required>
                <Input
                  disabled={payload.tripId !== -1}
                  onChange={(event) => handleChange("phoneNumber", event)}
                  value={payload.phoneNumber}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Transporter" required>
                <Select
                  disabled={payload.tripId !== -1}
                  onChange={(event) => handleChange("transporter", event)}
                  value={payload.transporter}
                >
                  <Option value="FedEx" key="FedEx">
                    FedEx
                  </Option>
                  <Option value="Bluedart" key="Bluedart">
                    Bluedart
                  </Option>
                  <Option value="DHL" key="DHL">
                    DHL
                  </Option>
                  <Option value="Gati" key="Gati">
                    Gati
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Destination" required>
                <Input
                  disabled={payload.tripId !== -1}
                  onChange={(event) => handleChange("dest", event)}
                  value={payload.dest}
                />
              </Form.Item>
              <Form.Item label="Status" required>
                <Select
                  disabled={payload.tripId === -1}
                  value={payload.currenStatus}
                  onChange={(event) => handleChange("currenStatus", event)}
                >
                  <Option value="Booked" key="Booked">
                    Booked
                  </Option>
                  <Option value="In Transit" key="In Transit">
                    In Transit
                  </Option>
                  <Option value="Reached Destination" key="Reached Destination">
                    Reached Destination
                  </Option>
                  <Option value="Delivered" key="Delivered">
                    Delivered
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </ListViewWrapper>
  );
};

export default ListView;
