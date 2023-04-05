import * as Yup from "yup";

const postSchema = Yup.object().shape({
  content: Yup.string()
    .required("Content is required")
    .min(2, "Content must be at least 2 characters")
    .max(300, "Content must be at most 300 characters"),

  published: Yup.boolean(),
  deleted: Yup.boolean(),
});

export default postSchema;
