/* =========================
   ข้อมูลสินค้า
========================= */

const products = [

    {
        name: "Robot X",
        cat: "robot",
        emoji: "🤖",
        price: 590,
        desc: "หุ่นยนต์อัจฉริยะสำหรับเล่นและสะสม"
    },

    {
        name: "Mini Bot",
        cat: "robot",
        emoji: "🦾",
        price: 390,
        desc: "หุ่นยนต์ขนาดเล็กน่ารัก"
    },

    {
        name: "City Block",
        cat: "block",
        emoji: "🧩",
        price: 450,
        desc: "ตัวต่อสร้างเมือง"
    },

    {
        name: "Space Block",
        cat: "block",
        emoji: "🚀",
        price: 650,
        desc: "ตัวต่อธีมอวกาศ"
    },

    {
        name: "Racing Car",
        cat: "car",
        emoji: "🏎️",
        price: 320,
        desc: "รถแข่งจำลองความเร็ว"
    },

    {
        name: "Mini Truck",
        cat: "car",
        emoji: "🚚",
        price: 280,
        desc: "รถบรรทุกขนาดเล็ก"
    },

    {
        name: "Toy Quest",
        cat: "game",
        emoji: "🎮",
        price: 490,
        desc: "เกมของเล่นสำหรับเล่นกับเพื่อน"
    },

    {
        name: "Family Puzzle",
        cat: "game",
        emoji: "🧠",
        price: 350,
        desc: "เกมฝึกทักษะและการคิด"
    }

];


/* =========================
   แสดงสินค้า
========================= */

function filterProducts(category, button) {

    document
        .querySelectorAll(".filter-btn")
        .forEach(function(btn) {

            btn.classList.remove(
                "active-filter"
            );

        });


    if (button) {

        button.classList.add(
            "active-filter"
        );

    }


    const list =
        document.getElementById(
            "product-list"
        );


    if (!list) return;


    const filteredProducts =
        products.filter(function(product) {

            return category === "all"
                || product.cat === category;

        });


    list.innerHTML =
        filteredProducts.map(function(product) {

            return `

                <div class="product-card">

                    <div class="product-img">

                        ${product.emoji}

                    </div>

                    <h2>
                        ${product.name}
                    </h2>

                    <p>
                        ${product.desc}
                    </p>

                    <div class="price">

                        ฿${product.price.toLocaleString()}

                    </div>

                </div>

            `;

        }).join("");

}


/* เปิดหน้าสินค้าครั้งแรก */

if (
    document.getElementById(
        "product-list"
    )
) {

    filterProducts(
        "all",
        document.querySelector(
            ".active-filter"
        )
    );

}


/* =========================
   GRAPH
========================= */

/*
Vertex = จุดยอด

Edge = เส้นเชื่อม

ตัวแปร graph นี้คือ
Adjacency List
*/

const graph = {

    "Toy Store": [
        "Robot",
        "Blocks",
        "Cars"
    ],

    "Robot": [
        "Robot X",
        "Mini Bot"
    ],

    "Blocks": [
        "City Block",
        "Space Block"
    ],

    "Cars": [
        "Racing Car",
        "Mini Truck"
    ],

    "Robot X": [
        "Toy Store"
    ],

    "Mini Bot": [
        "Robot"
    ],

    "City Block": [
        "Blocks"
    ],

    "Space Block": [
        "Blocks"
    ],

    "Racing Car": [
        "Cars"
    ],

    "Mini Truck": [
        "Cars"
    ]

};


/* แสดง Adjacency List */

const adjacency =
    document.getElementById(
        "adjacency"
    );


if (adjacency) {

    adjacency.textContent =
        Object.entries(graph)
        .map(function([key, value]) {

            return (
                key +
                ": [" +
                value
                .map(function(item) {

                    return '"' + item + '"';

                })
                .join(", ") +
                "]"
            );

        })
        .join("\n");

}


/* =========================
   DFS
========================= */

function runDFS() {

    const result =
        document.getElementById(
            "path-result"
        );


    if (!result) return;


    const visited =
        new Set();


    const path = [];


    function dfs(node, target) {

        visited.add(node);

        path.push(node);


        if (node === target) {

            return true;

        }


        for (
            const next of
            (graph[node] || [])
        ) {

            if (
                !visited.has(next)
            ) {

                if (
                    dfs(
                        next,
                        target
                    )
                ) {

                    return true;

                }

            }

        }


        path.pop();

        return false;

    }


    dfs(
        "Toy Store",
        "Robot X"
    );


    result.innerHTML =

        "<b>DFS Path:</b> " +

        path.join(" → ") +

        "<br>" +

        "ความหมาย: " +

        "เส้นทางจากร้านของเล่น " +

        "ไปยังสินค้า Robot X";

}


/* =========================
   TREE PREORDER
========================= */

function preorder() {

    const result =
        document.getElementById(
            "traversal-result"
        );


    if (!result) return;


    const order = [

        "Toy Store",

        "Robot",

        "Robot X",

        "Mini Bot",

        "Blocks",

        "City Block",

        "Space Block",

        "Cars",

        "Racing Car",

        "Mini Truck"

    ];


    result.innerHTML =

        "<b>Preorder:</b> " +

        order.join(" → ");

}