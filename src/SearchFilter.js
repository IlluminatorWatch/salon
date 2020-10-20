import React, { Component } from "react";
import data from "./data.json";

class SearchFilter extends Component {
  state = {
    itemsToDisplay: [],
    itemsToUse: [],
    salons: []

  };
  render() {   
    return (
      <div>
        <div className="salonfilter">
          <div>
            Choose a pricerange for the hair salon : &nbsp;
            <select id="salonfilter" onChange={this.optionSelected}>
              <option value="any">Choose Any</option>
              {this.state.salons.map(salon => {
                return <option value={salon}>{salon}</option>;
              })}
            </select>
          </div>
          <div>
            Sort by Low to High or High to Low: &nbsp;
            <select id="sortfilter" onChange={this.sortBy}>
              <option value="ranking">Ranking</option>
              <option value="asc">Rating: Low to High</option>
              <option value="des">Rating: High to Low</option>
            </select>
          </div>
        </div>
        <div className="saloncontainer">
          {this.state.itemsToDisplay.map(salon => {
            let salons = salon["Price Range"]
              .substring(1, salon["Price Range"].length - 2)
              .split(",");
            return (
              <div className="salon">
                <div className="saloninfo">
                  <i
                    className="fas fa-map-marker"
                    style={{ color: "orangered", fontSize: "12px" }}
                    ></i>
                    <div className="sepline"></div>
                  <span className="salonname">{salon["Name"]}</span>
                    {/* <span>
                    <button type="button" >Klicka</button>
                    </span> */}
                  {/* <br /> */}
                    &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="saloncity">{salon["Address"]}</span>
                  {/* <br /> */}
                  {/* <span className="salonname">{salon["Media"]}</span> */}
                  {/* <br /> */}
                  &nbsp;
                  <div className="salonsalons">
                    {salons.map(salon => {
                        let salonPrice = salon.substring(
                            1,
                            salon.length - 1
                            );
                            salonPrice = salonPrice.includes("'")
                            ? salonPrice.substring(1, salonPrice.length)
                            : salonPrice;
                            return (
                                <div pill className="salonsalon" variant="light"> Price:&nbsp;
                          {salonPrice} Sek
                        </div>
                      );
                    })}
                  </div>
                  {/* <br /> */}
                </div>
                <div className="salonstats">
                  <div>Number of Reviews:
                    <i
                      style={{ fontSize: "15px" }}
                      className="far fa-comment-alt"
                      ></i>
                    &nbsp;
                    {salon["Number of Reviews"]}
                  <div>
                    <i style={{ fontSize: "15px" }} className="far fa-star">★★★★☆</i>
                    &nbsp; 
                    {salon["Rating"]}
                  </div>
                  {/* <Button type="button" variant="btn btn-success" onClick={() => salon.push('/Salon')}>Click button to view products</Button> */}
                    <div className="sepline"></div>
                  </div>
                </div>
              </div>
            );
        })}
        </div>
      </div>
    );

  }

  filterOnSearch = event => {
    if (
      !event.target.value ||
      event.target.value === " " ||
      event.target.value === ""
    )
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(
        item =>
          item["Name"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["Price Range"]
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item["City"].toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };



    
  optionSelected = () => {
    var e = document.getElementById("salonfilter");
    var selected = e.options[e.selectedIndex].text;

    if (selected === "Choose Any")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else {
      let itemsToDisplay = [];
      itemsToDisplay = this.state.itemsToUse.filter(item =>
        item["Price Range"].toLowerCase().includes(selected.toLowerCase())
      );
      this.setState({ itemsToDisplay });
    }
  };

  sortBy = () => {
    var e = document.getElementById("sortfilter");
    var selected = e.options[e.selectedIndex].value;

    if (selected === "ranking")
      this.setState({ itemsToDisplay: [...this.state.itemsToUse] });
    else if (selected === "asc") {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return a["Rating"] - b["Rating"];
      });
      this.setState({ itemsToDisplay });
    } else {
      let itemsToDisplay = [...this.state.itemsToDisplay];
      itemsToDisplay.sort(function(a, b) {
        return b["Rating"] - a["Rating"];
      });
      this.setState({ itemsToDisplay });
    }
  };



  componentDidMount() {
    this.reRenderList();
  }

  reRenderList() {
    var salons = [];
    var itemsToDisplay = [];
    for (var i = 0; i < data.length; i++) {
      itemsToDisplay.push(data[i]);
      data[i]["Price Range"]
        .substring(1, data[i]["Price Range"].length - 2)
        .split(",")
        .forEach(salon => {
          let c = salon.substring(1, salon.length - 1);
          c = c.includes("'") ? c.substring(1, c.length) : c;
          if (salons.indexOf(c) < 0) {
            salons.push(c);
          }
        });
    }

    this.setState({ salons });

    this.setState({ itemsToDisplay }, () => {
      this.setState({ itemsToUse: [...this.state.itemsToDisplay] });
    });
  }
}

export default SearchFilter;