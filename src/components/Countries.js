import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Filter from "./Filter"

// const url = "https://restcountries.com/v2/all"
const url = "https://restcountries.com/v3.1/all"

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch(url)
            const countries = await response.json()
            setCountries(countries)
            setIsLoading(false)
        }

        fetchCountries()
    }, [])

    return (
        <>
            <Filter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setFiltered={setFiltered}
                setCountries={setCountries}
                countries={countries}
            />
            {isLoading ? (
                <h1 className="loading">Loading...</h1>
            ) : searchInput.length > 1 ? (
                <section className="countries">
                    {filtered?.map((country) => {
                        console.log(country)
                        const {name, flags, population, region, capital} =
                            country

                        return (
                            <Link to={`/countries/${country?.name.common}`} key={name.common}>
                                <article>
                                    <div className="flag">
                                        <img src={flags?.png} alt={name} className="img"/>
                                    </div>
                                    <div className="details">
                                        <h4 className="country-name">
                                            Name: <span>{country?.name.common}</span>
                                        </h4>
                                        <h4>
                                            Population: <span>{population?.toLocaleString()}</span>
                                        </h4>
                                        <h4>
                                            Region: <span>{region}</span>
                                        </h4>
                                        <h4>
                                            Capital: <span>{capital}</span>
                                        </h4>
                                    </div>
                                </article>
                            </Link>
                        )
                    })}
                </section>
            ) : (
                <section className="countries">
                    {countries?.map((country) => {
                        const {name, flags, population, region, capital, cca3} =
                            country
                        return (
                            <Link to={`/countries/${cca3}`} key={name.common}>
                                <article>
                                    <div className="flag">
                                        <img src={flags?.png} alt={name} className="img"/>
                                    </div>
                                    <div className="details">
                                        <h4 className="country-name">
                                            Name: <span>{name?.common}</span>
                                        </h4>
                                        <h4>
                                            Population: <span>{population?.toLocaleString()}</span>
                                        </h4>
                                        <h4>
                                            Region: <span>{region}</span>
                                        </h4>
                                        <h4>
                                            Capital: <span>{capital}</span>
                                        </h4>
                                    </div>
                                </article>
                            </Link>
                        )
                    })}
                </section>
            )}
        </>
    )
}

export default Countries
