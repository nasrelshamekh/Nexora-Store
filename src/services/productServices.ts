export async function getProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/products`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getSpecificProduct(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/products/${id}`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getAllCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/categories`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getAllBrands() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/brands`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getSpecificBrand(brandId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/brands/${brandId}`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getSpecificCategory(categoryId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/categories/${categoryId}`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}

export async function getAllSubCategories() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/subcategories`, {
        method: "GET"
    })
    const data = await response.json()

    return data
}
