import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LinkIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { isValidUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "../ui/button";
import myAxios from "@/lib/axios.config";
import { POST_URL } from "@/lib/apiEndPoints";
import { useSession } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postState, setPostState] = useState({
    url: "",
    image_url: "",
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    url: [],
    title: [],
    description: [],
  });
  const { data } = useSession();
  const user: CustomUser = data?.user as CustomUser;

  const loadPreview = async () => {
    if (postState?.url?.length > 0 && isValidUrl(postState.url)) {
      setLoading(true);
      axios
        .post("/api/image-preview", { url: postState.url })
        .then((res) => {
          setLoading(false);
          const response: ImagePreviewType = res.data?.data;
          const img =
            response.images.length > 0
              ? response.images[0]
              : "https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

          setPostState({
            ...postState,
            image_url: img,
            title: response.title,
            description: response.description ?? "",
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong while fetching the preview");
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    myAxios
      .post(POST_URL, postState, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);
        setOpen(false);
        setPostState({
          url: "",
          image_url: "",
          title: "",
          description: "",
        });
        toast.success(response.message);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          toast.error("Something went wrong. Please try again again.");
        }
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="flex space-x-3 items-center mb-4"
          onClick={() => setOpen(true)}
        >
          <LinkIcon className="w-5 h-5" />
          <p>Submit Artical</p>
        </div>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="overflow-y-scroll max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {postState.image_url && (
            <Image
              src={postState.image_url}
              width={450}
              height={450}
              alt="image"
              className="object-contain w-full rounded-xl my-2"
            />
          )}
          <div className="mb-4">
            <Label htmlFor="=url">URL</Label>
            <Input
              type="text"
              id="url"
              placeholder="Paste your URL here..."
              value={postState.url}
              onChange={(e) =>
                setPostState({ ...postState, url: e.target.value })
              }
              onBlur={loadPreview}
            />
            <span className="text-red-500">{errors.url?.[0]}</span>
          </div>
          <div className="mb-4">
            <Label htmlFor="=title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              value={postState.title}
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
              disabled={loading}
            />
            <span className="text-red-500">{errors.title?.[0]}</span>
          </div>

          <div className="mb-4">
            <Label htmlFor="=description">Description</Label>
            <Textarea
              id="description"
              placeholder="Description"
              value={postState.title}
              rows={10}
              onChange={(e) =>
                setPostState({ ...postState, description: e.target.value })
              }
              disabled={loading}
            />
            <span className="text-red-500">{errors.description?.[0]}</span>
          </div>

          <div className="mb-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
