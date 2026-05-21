"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { RiDeleteBin5Line } from "react-icons/ri";


const Delete = ({ car }) => { 


  const handleDelete = async () => {
    const tokenResponse = await authClient.token();
    const actualToken = tokenResponse?.data?.token || tokenResponse?.token;

    console.log(actualToken, "Token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars/${car._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${actualToken}`,
        },
      }
    );

    const result = await res.json();

    if (res.ok) {
      window.location.reload();
    }

    return result;
  };

  return (
    <AlertDialog>
      <Button
        className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm py-2 px-4 rounded-lg transition-all border border-rose-100"
        variant="danger"
      >
        <RiDeleteBin5Line className="w-4 h-4" />
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Car</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to delete <strong>{car.carModel}</strong>?
                This action cannot be undone and will permanently remove this
                car from the system.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button className="rounded" slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="rounded"
                slot="close"
                variant="danger"
              >
                Delete Car
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default Delete;