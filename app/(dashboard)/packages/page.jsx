"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

function page() {
  return (
    <>
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="flex-1">
          <Card title="Basic Inputs">
            <div className="space-y-3">
              <Textinput
                label="Project Name*"
                id="pn"
                type="text"
                placeholder="Management dashboard"
              />
              <Textarea
                label="Project description"
                id="pn4"
                placeholder="Type here"
              />
              <Textinput
                label="Project Name*"
                id="pn"
                type="text"
                placeholder="Management dashboard"
              />
            </div>
            <button className="btn btn-dark px-5 py-2.5 text-sm mt-6">
              Update
            </button>
          </Card>
        </div>
      </div>
    </>
  );
}

export default page;
