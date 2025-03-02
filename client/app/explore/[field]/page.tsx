import { BackendUrl } from "@/utils/constants";
import { getCurrentUserToken } from "@/utils/firebase";
import axios from "axios";
import { useEffect } from "react";

export default function Field() {
  useEffect(() => {
    const getDetails = async () => {
      try {
        const token = await getCurrentUserToken();
        const res = await axios.post(
          `${BackendUrl}/api/user/chatbot`,
          { text: fiedl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    getDetails();
  }, [field]);

  return;
}
