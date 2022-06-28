import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import "../country.css"

const Country = () => {
    const [country, setCountry] = useState([])
    const {name} = useParams()
    useEffect(() => {
        const fetchCountryData = async () => {
            const response = await fetch(
                `https://restcountries.com/v2/name/${name}`
            )
            const country = await response.json()
            console.log(country)
            setCountry(country)
        }

        fetchCountryData()
    }, [name])

    return (
        <>
            <section className="country">
                <Link to="/" className="btn btn-light">
                    <i className="far fa-arrow-left"></i> Back Home
                </Link>
                {/*<div>*/}
                {/*    {country[0].name?.common}*/}
                {/*</div>*/}
                {country?.map((c) => {
                    const {
                        numericCode,
                        flag,
                        name,
                        nativeName,
                        population,
                        region,
                        subregion,
                        capital,
                        topLevelDomain,
                        currencies,
                        languages,
                        borders,
                    } = c
                    return (
                        <article key={name}>
                            <div className="country-inner">
                                <div className="flag">
                                    <img src={flag} alt={name}/>
                                </div>

                                <div className="country-details">
                                    <div>
                                        <h2>{name}</h2>
                                        <h5>
                                            Native Name: <span>{nativeName}</span>
                                        </h5>
                                        <h5>
                                            Population: <span>{population.toLocaleString()}</span>
                                        </h5>
                                        <h5>
                                            Region: <span>{region}</span>
                                        </h5>
                                        <h5>
                                            Sub Region: <span>{subregion}</span>
                                        </h5>
                                        <h5>
                                            Capital: <span>{capital}</span>{" "}
                                        </h5>
                                    </div>

                                    <div>
                                        <h5>
                                            Top Level Domain: <span>{topLevelDomain}</span>
                                        </h5>
                                        <h5>
                                            Currencies: <span>{currencies[0].name}</span>
                                        </h5>
                                        <h5>
                                            Languages: <span>{languages[0].name}</span>
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3>Border Countries: </h3>
                                <div className="borders">
                                    {borders?.map((border) => {
                                        return (
                                            <ul key={border}>
                                                <Link to={`/countries/${border}`} key={numericCode} value={border}>
                                                    {border}
                                                </Link>
                                            </ul>
                                        )
                                    })}
                                </div>
                            </div>
                        </article>
                    )
                })}
            </section>
        </>
    )
}

export default Country
