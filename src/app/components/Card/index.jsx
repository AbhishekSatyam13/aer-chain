import React from "react";
import { CardWrapper } from "./style";
import { Progress, Tag } from "antd";

export const CardOne = ({ title = "title", value = "value" }) => {
  return (
    <CardWrapper>
      <div className="card-section first">
        <h6>{title}</h6>
        <h1>{value}</h1>
      </div>
    </CardWrapper>
  );
};

export const CardTwo = ({ title = "title", value = "value" }) => {
  return (
    <CardWrapper>
      <div className="card-section first">
        <h6>{title}</h6>
        <h1>{value}</h1>
      </div>
      <div className="card-section second">
        <div className="second-content">
          <Progress
            type="circle"
            percent={75}
            size="small"
            strokeWidth={12}
            strokeColor="green"
          />
          <span>
            <h4>OneTime: <span className="number">1,23,456</span></h4>
          </span>
        </div>
      </div>
    </CardWrapper>
  );
};

export const CardThree = ({ title = "title", value = "value" }) => {
  return (
    <CardWrapper>
      <div className="card-section first delayed">
        <h6>{title}</h6>
        <div>{value}</div>
      </div>
      <div className="card-section first">
        <h6>In transist</h6>
        <div>18,033 <Tag color="blue">72%</Tag></div>
      </div>
      <div className="card-section first">
        <h6>Delivered</h6>
        <div>18,033 <Tag color="blue">72%</Tag></div>
      </div>
    </CardWrapper>
  );
};
