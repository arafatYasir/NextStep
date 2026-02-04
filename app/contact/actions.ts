"user server";

export async function submitContactForm(formData: FormData) {
    // Extract the data
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Create a object including the access key
    const data = {
        name,
        email,
        phone,
        message,
        access_key: process.env.WEB3FORM_ACCESS_KEY
    };

    // Call the api in post method
    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
        return { success: true };
    } else {
        return { success: false };
    }
}