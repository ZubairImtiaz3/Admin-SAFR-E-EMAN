"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useQuery } from "react-query";
import { fetchDocuments } from "@/components/firebase/store/Crud";

function page() {
  const { data, error } = useQuery(
    "packages",
    () => fetchDocuments("/Packages", "features"),
    {
      suspense: true,
    }
  );

  return (
    <>
      <div className="flex justify-center gap-8 flex-wrap">
        {data &&
          data.map((pkg) => (
            <div className="flex-1" key={pkg.id}>
              <Card title={pkg.id}>
                <div className="space-y-3">
                  <Textinput
                    label="Package price*"
                    id={`price-${pkg.id}`}
                    type="text"
                    defaultValue={pkg.pkgPrice}
                    placeholder="Enter package price"
                  />
                  <Textarea
                    className="h-28"
                    label="Package description"
                    id={`desc-${pkg.id}`}
                    dvalue={pkg.description}
                    placeholder="Enter package description"
                  />
                  <Textarea
                    className="h-28"
                    label="Pkg features*"
                    id={`features-${pkg.id}`}
                    type="text"
                    dvalue={
                      pkg.features && Object?.values(pkg.features[0]).join(", ")
                    }
                    placeholder="Enter package features"
                  />
                </div>
                <button className="btn btn-dark px-5 py-2.5 text-sm mt-6">
                  Update
                </button>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
