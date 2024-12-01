function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
}

function SuccessCallBack(data) {
    console.log(data);
}

function ErrorCallBack(err) {
    console.log(err);
}

const apiMovies = "https://localhost:7208/api/Movies";
const apiRating = "https://localhost:7208/api/Movies/rating/";
const apiDuration = "https://localhost:7208/api/Movies/GetByDuration?duration=";
const apiCast = "https://localhost:7208/api/Casts";

function init() {
    allMoviesStr = AllMovies();
    document.getElementById("AllMovies").innerHTML = allMoviesStr;
    $("#filter").hide();
    $("#castRow").hide();
}

function AllMovies() {
    let strMovies = "";
    for (let i = 0; i < movies.length; i++) {
        console.log(movies[i].title);

        strMovies += `<div class="col-md-6 col-lg-4 card" id="m${movies[i].id}">
                <div class="row">
                    <div class="col-4 col-md-6 cardPart">
                        <img class="image-container" src="${movies[i].photoUrl}" onerror="handleImageError(this)">
                        <span class="rating"><i class="fas fa-star"></i> ${movies[i].rating}</span>
                    </div>
                    <div class="col-8 col-md-6 cardPart">
                        <h3 class="MovieName">${movies[i].title}</h3>
                        <p><i class="fa fa-clock-o"></i>${movies[i].duration} minutes</p>
                        <p><i class="fa fa-dollar"></i>${movies[i].income / 1000000}M$</p>
                        <span class="tag-cloud genre">${movies[i].genre}</span>
                        <span class="tag-cloud language">${movies[i].language}</span>
                    </div>
                    <div class="col-12 desc">
                        ${movies[i].description}
                    </div>
                    <div class="col-12 wishD">
                        <button class="btnATWish" onclick="AddToWishList(${i})">Add to Wish List</button>
                    </div>
                </div>
            </div>`;
    }
    return strMovies;
}

function AddToWishList(i) {
    ajaxCall('POST', apiMovies, JSON.stringify(movies[i]), SuccessCallBack, ErrorCallBack);
    console.log(movies[i]);
}

function ShowWishList() {
    $(".wishD").hide();
    $(".card").hide();
    $("#castRow").hide();
    $("#filter").show();
    $("#filterRating").val('');
    $("#filterDuration").val('');
    ajaxCall('GET', apiMovies, null, SuccessCBWish, ErrorCallBack);
}

function SuccessCBWish(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        $(`#m${data[i].id}`).show();
    }
}

function ShowAllMovies() {
    $(".card").show();
    $(".wishD").show();
    $("#filter").hide();
    $("#castRow").hide();
}

function FilterByDur() {
    duration = $("#filterDuration").val();
    $("#filterRating").val('');
    $(".card").hide();
    ajaxCall('GET', apiDuration + duration, null, SuccessCBWish, ErrorCallBack);

}

function FilterByRate() {
    rating = $("#filterRating").val();
    $("#filterDuration").val('');
    $(".card").hide();
    ajaxCall('GET', apiRating + rating, null, SuccessCBWish, ErrorCallBack);

}

function handleImageError(imgElement) {
    imgElement.src = "pics/Xpic.png";
}

function ShowCastForm() {
    $(".card").hide();
    $("#filter").hide();
    $("#castRow").show();
}

$(document).ready(function () {
    $("#castForm").submit(function (event) {
        event.preventDefault();

        cast = {
            Id: $("#idC").val(),
            Name: $("#nameC").val(),
            Role: $("#roleC").val(),
            DateOfBirth: $("#bdC").val(),
            Country: $("#countryC").val(),
            PhotoUrl: $("#phuC").val(),
        }
        ajaxCall('POST', apiCast, JSON.stringify(cast), SuccessCBCast, ErrorCallBack);
    });
});

function SuccessCBCast(err) {
    console.log(err);
    if(!err){
        alert("Something went wrong! Check if this ID is already taken!");
    }
}

 

