"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import {
  fetchDocuments,
  updateDocument,
} from "@/components/firebase/store/Crud";

function page() {
  const [loading, setLoading] = useState(false);

  // Store updated values in a state
  const [updatedData, setUpdatedData] = useState({});

  const { data, error } = useQuery(
    "packages",
    () => fetchDocuments("/Packages"),
    {
      suspense: true,
    }
  );

  const handleInputChange = (id, key, value) => {
    let processedValue = value;

    // Check if the key is "features" and process the value to an array
    if (key === "features") {
      processedValue = value.split(",").map((item) => item.trim());
    }

    setUpdatedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: processedValue,
      },
    }));
  };

  const handleUpdateClick = async (id) => {
    setLoading(id);

    if (Object.keys(updatedData).length === 0) {
      toast.error("Nothing To Update", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      if (updatedData[id]) {
        await updateDocument("/Packages", id, updatedData[id]);
        toast.success("Update Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Error Updating, Try agian!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setLoading(null);
  };

  return (
    <>
      <div className="flex justify-center gap-8 flex-wrap">
        {data &&
          data.map((pkg) => (
            <div className="lg:flex-1" key={pkg.id}>
              <Card title={pkg.id}>
                <div className="space-y-3">
                  <Textinput
                    label="Package price*"
                    id={`price-${pkg.id}`}
                    type="text"
                    defaultValue={pkg.pkgPrice}
                    placeholder="Enter package price"
                    onChange={(e) =>
                      handleInputChange(pkg.id, "pkgPrice", e.target.value)
                    }
                  />
                  <Textarea
                    className="h-28"
                    label="Package description"
                    id={`desc-${pkg.id}`}
                    dvalue={pkg.description}
                    placeholder="Enter package description"
                    onChange={(e) =>
                      handleInputChange(pkg.id, "description", e.target.value)
                    }
                  />
                  <Textarea
                    className="h-28"
                    label="Pkg features*"
                    id={`features-${pkg.id}`}
                    type="text"
                    dvalue={pkg.features && pkg.features.join(", ")}
                    placeholder="Enter package features"
                    onChange={(e) =>
                      handleInputChange(pkg.id, "features", e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => handleUpdateClick(pkg.id)}
                  className="btn btn-dark px-5 py-2.5 text-sm mt-6"
                >
                  {pkg.id === loading ? (
                    <span className="flex justify-center items-center gap-3">
                      Updating... <ClipLoader size={17} color="#FFF" />
                    </span>
                  ) : (
                    "Update"
                  )}
                </button>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
}

export default page;
