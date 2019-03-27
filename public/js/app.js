$.ajax({
    method: "GET",
    url: "/api/products/"
}).then(function (data) {

    for (let i = 0; i < data.length; i++) {
        $('#itemRow').append(
            `<tr>
            <td scope="col">${data[i].product_name}</td> 
            <td>${data[i].department_name}</td> 
            <td>${data[i].price}</td> 
            <td class="${[i]}">${data[i].stock_quantity}</td> 
            <td><input id="${[i]}" value=0></td> 
            <td><button class="addButt">Add to cart</button></td>
        <tr>`
        )
    }

    const updateStock = function() {
        $.ajax({
            method: "GET",
            url: "/api/products/"
        }).then(function(data) {
            for( let i = 0; i < data.length; i++) {
                document.getElementsByClassName(`${i}`).text = parseInt(data[i].stock_quantity)

            }
        })
    }


    let cartArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const addQuantity = function (e) {
        e.preventDefault()
        $.ajax({
            method: "GET",
            url: '/api/products/'
        }).then(function(data) {

        for (let i = 0; i < data.length; i++) {
            const input = $(`#${i}`).val().trim()
            const value = data[i].stock_quantity
            if (value >= input) {
                cartArray[i] += parseInt(input)
                let sum = value - input
                $(`.${i}`).text(sum)
                $.ajax({
                    method: 'PUT',
                    url: `/api/products/${i + 1}`,
                    data: {
                        "stock_quantity": sum
                    }
                }).then(function (data) {
                    console.log(data)
                    console.log(cartArray)
                    $(`#${[i]}`).val('0')
                })
            } else {
                console.log("You are low on inventory")
            }
        }    
        })
        updateStock();     
    }

    const addToCart = function () {
        $('.modal-body').empty()
        let sumCart = 0;
        for (let i = 0; i < data.length; i++) {
            sumCart += data[i].price * cartArray[i]
            if (cartArray[i] != 0) {
                const sumPrice = data[i].price * cartArray[i]
                $('.modal-body').append(`<p>${data[i].product_name} x ${cartArray[i]} = $${sumPrice}</p>`)
            } else {
            }
        }
        $('.modal-body').append(`Total: $${sumCart}`)
        $('.modal').modal('show')
        console.log(sumCart)
    }

    const checkout = function(e) {
        e.preventDefault()
        $('.modal-body').text('Total: $0')
        console.log("working"
        )
    }

    $('#checkout').on('click', checkout)
    $('.addButt').on('click', addQuantity)
    $('#cartBtn').on('click', addToCart)
    console.log(data)
});

