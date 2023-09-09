"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import Modal from "@/components/ui/Modal";
import {
  fetchDocuments,
  updateDocument,
} from "@/components/firebase/store/Crud";
import { number } from "yup";

function page() {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState(null);
  const [actionType, setActionType] = useState(null);

  // Store updated values in a state
  const [updatedData, setUpdatedData] = useState({});

  const { data } = useQuery("packages", () => fetchDocuments("/Packages"), {
    suspense: true,
  });

  const { data: infoData } = useQuery(
    "packages_info",
    () => fetchDocuments("/Packages_Info"),
    {
      suspense: true,
    }
  );

  const handleModalUpdate = () => {
    setModal(false);
    if (currentPackageId) {
      handleUpdateClick(currentPackageId);
    }
  };

  const handleUpdateForSinglePackage = (id) => {
    setCurrentPackageId(id);
    setActionType("single");
    setModal(true);
  };

  const handleSaveAll = () => {
    setActionType("all");
    setModal(true);
  };

  const handleInputChange = (id, key, value) => {
    let processedValue = value;

    // Check if the key is "features" and process the value to an array
    if (key === "features") {
      processedValue = value.split(",").map((item) => item.trim());
    }

    if (key === "heading" || key === "year") {
      // If the input is heading or year
      setUpdatedData((prev) => ({
        ...prev,
        [key]: processedValue,
      }));
    } else {
      // Otherwise, it belongs to a package
      setUpdatedData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [key]: processedValue,
        },
      }));
    }
  };

  const handleUpdateClick = async (id) => {
    setLoading(id);

    if (Object.keys(updatedData).length === 0 || !updatedData[id]) {
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
      setLoading(null);
      return;
    }

    try {
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

      // Clear the updated data for this package id after successful update
      setUpdatedData((prev) => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Error Updating, Try again!", {
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

  const handleSaveAllChanges = async () => {
    setModal(false);
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
      return;
    }

    setLoading(true); // Start the loading state

    const updatePromises = [];

    const updatePayload = {};
    if (updatedData.heading !== undefined) {
      updatePayload.heading = updatedData.heading;
    }
    if (updatedData.year !== undefined) {
      updatePayload.year = updatedData.year;
    }

    if (Object.keys(updatePayload).length > 0) {
      updatePromises.push(
        updateDocument("/Package_Info", "title", updatePayload)
      );
    }

    console.log(updatePayload);

    // Create an array of promises for the individual package updates
    Object.keys(updatedData).forEach((pkgId) => {
      if (pkgId !== "heading" && pkgId !== "year") {
        // Exclude heading and year since they're handled separately
        updatePromises.push(
          updateDocument("/Packages", pkgId, updatedData[pkgId])
        );
      }
    });

    try {
      await Promise.all(updatePromises); // Wait for all updates to complete

      toast.success("All Updates Successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUpdatedData({}); // Clear the updated data after successful batch update
    } catch (error) {
      console.error("Error updating documents:", error);
      toast.error("Error Updating Some Packages, Please Try Again!", {
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

    setLoading(false); // End the loading state
  };

  return (
    <>
      <div className="mt-2 mb-8 px-8 flex justify-center gap-8 flex-wrap">
        <Card className="md:flex-1 bg-white" title="Heading">
          <Textarea
            className="h-20"
            id=""
            type="text"
            dvalue={infoData[0]?.heading}
            placeholder="Enter your package heading"
            onChange={(e) => handleInputChange(null, "heading", e.target.value)}
          />
        </Card>
        <Card className="md:flex-1 bg-white" title="Year">
          <Textinput
            type="number"
            id=""
            defaultValue={infoData[0]?.year}
            placeholder="Enter your package year"
            onChange={(e) => handleInputChange(null, "year", e.target.value)}
          />
        </Card>
      </div>
      <div className="flex justify-center gap-8 flex-wrap mt-2">
        {data &&
          data.map((pkg) => (
            <>
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
                    onClick={() => handleUpdateForSinglePackage(pkg.id)}
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

              <Modal
                centered
                activeModal={modal}
                onClose={() => setModal(false)}
                title="Are you sure ?"
              >
                <p className="font-semibold text-center">
                  {actionType === "single"
                    ? 'Clicking "Confirm" will update the selected Umrah package.'
                    : 'Clicking "Confirm" will update all changes made.'}
                </p>
                <p className="font-semibold text-center mt-2">
                  Do you want to proceed?
                </p>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setModal(false)}
                    className="btn btn-dark px-5 py-2.5 text-sm mt-6"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      actionType === "single"
                        ? handleModalUpdate
                        : handleSaveAllChanges
                    }
                    className="btn btn-dark px-5 py-2.5 text-sm mt-6"
                  >
                    Confirm
                  </button>
                </div>
              </Modal>
            </>
          ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveAll}
          className="btn btn-dark px-5 py-2.5 text-sm mt-6"
        >
          Save All Changes
        </button>
      </div>
    </>
  );
}

export default page;
