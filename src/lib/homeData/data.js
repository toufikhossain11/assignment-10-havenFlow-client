export const getProperties = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/featured-properties`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }
  return res.json();
};

export const getReviews = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};
//admin users btn json
export const getUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};
export const getAdminProperties = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/properties`,  // ✅ eta status filter chara shob property dey
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }
  return res.json();
};