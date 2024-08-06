import { Button, Col, InputNumber, Row } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import arrow from "./images/icon-arrow.svg";

const AgeCalculator = () => {
  const [dayValue, setDayValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [dayMessage, setDayMessage] = useState("");
  const [monthMessage, setMonthMessage] = useState("");
  const [yearMessage, setYearMessage] = useState("");
  const [age, setAge] = useState({ day: "- -", month: "- -", year: "- -" });

  const calculateAge = () => {
    setDayMessage("");
    setMonthMessage("");
    setYearMessage("");

    const today = dayjs();
    const currentYear = today.year();
    let valid = true;

    if (!dayValue) {
      setDayMessage("This field is required");
      valid = false;
    } else if (!(dayValue > 0 && dayValue <= 31)) {
      setDayMessage("Must be a valid date");
      valid = false;
    }

    if (!monthValue) {
      setMonthMessage("This field is required");
      valid = false;
    } else if (!(monthValue > 0 && monthValue <= 12)) {
      setMonthMessage("Must be a valid month");
      valid = false;
    }

    if (!yearValue) {
      setYearMessage("This field is required");
      valid = false;
    } else if (yearValue > currentYear) {
      setYearMessage("Must be in the past");
      valid = false;
    }

    if (valid) {
      const birthDate = dayjs(`${yearValue}-${monthValue}-${dayValue}`);
      const day = today.diff(birthDate, "day") % 31;
      const year = today.diff(birthDate, "year");
      const month = today.diff(birthDate, "month") % 12;
      setAge({ day, month, year });
    } else {
      setAge({ day: "- -", month: "- -", year: "- -" });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="Main w-1/2 p-12">
        <Row className="Row w-3/4">
          <Col span={8}>
            <Row>
              <label
                className={`Lable text-xs font-medium mb-2 tracking-widest ${
                  dayMessage ? "Alert" : ""
                }`}
              >
                DAY
              </label>
            </Row>
            <Row>
              <InputNumber
                className={`Input p-2 w-28 mr-2 text-lg font-bold tracking-tight ${
                  dayMessage ? "InputBorder" : ""
                }`}
                placeholder="DD"
                controls={false}
                value={dayValue}
                onChange={(value) => setDayValue(value)}
              />
            </Row>
            <Row className="Alert tracking-tighter text-xs italic mt-1">
              {dayMessage}
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <label
                className={`Lable text-xs font-medium mb-2 tracking-widest ${
                  monthMessage ? "Alert" : ""
                }`}
              >
                MONTH
              </label>
            </Row>
            <Row>
              <InputNumber
                className={`Input p-2 w-28 mr-2 text-lg font-bold tracking-tight ${
                  monthMessage ? "InputBorder" : ""
                }`}
                placeholder="MM"
                controls={false}
                value={monthValue}
                onChange={(value) => setMonthValue(value)}
              />
            </Row>
            <Row className="Alert tracking-tighter text-xs italic mt-1">
              {monthMessage}
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <label
                className={`Lable text-xs font-medium mb-2 tracking-widest ${
                  yearMessage ? "Alert" : ""
                }`}
              >
                YEAR
              </label>
            </Row>

            <Row>
              <InputNumber
                className={`Input p-2 w-28 mr-2 text-lg font-bold tracking-tight ${
                  yearMessage ? "InputBorder" : ""
                }`}
                placeholder="YYYY"
                controls={false}
                value={yearValue}
                onChange={(value) => setYearValue(value)}
              />
            </Row>
            <Row className="Alert tracking-tighter text-xs italic mt-1">
              {yearMessage}
            </Row>
          </Col>
        </Row>
        <hr className="mt-12 mb-5" />
        <Button
          className="Button size-16 rounded-full h-16 -top-14"
          onClick={() => {
            calculateAge();
          }}
        >
          <img src={arrow} alt="Icon" />
        </Button>
        <div className="TextBox -mt-12">
          <span className="TextValues text-7xl font-bold">
            <span className="Text">{age.year}</span>{" "}
            <span className="Values italic">year</span>
          </span>
          <br />
          <span className="TextValues text-7xl font-bold">
            <span className="Text">{age.month}</span>{" "}
            <span className="Values italic">months</span>
          </span>
          <br />
          <span className="TextValues text-7xl font-bold">
            <span className="Text">{age.day}</span>{" "}
            <span className="Values italic">days</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
