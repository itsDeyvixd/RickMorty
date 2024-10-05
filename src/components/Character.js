import React, { useState, useEffect } from "react";

const Character = ({ characters = [] }) => {
    const [expandedEpisodes, setExpandedEpisodes] = useState({});
    const [episodeDetails, setEpisodeDetails] = useState({});

    const toggleEpisodes = (characterId) => {
        setExpandedEpisodes({
            ...expandedEpisodes,
            [characterId]: !expandedEpisodes[characterId],
        });
    };

    useEffect(() => {
        const fetchEpisodeDetails = async () => {
            const episodePromises = characters.flatMap(
                (character) => character.episode
            );
            const uniqueEpisodes = [...new Set(episodePromises)];

            const episodeDetails = await Promise.all(
                uniqueEpisodes.map(async (episodeUrl) => {
                    const response = await fetch(episodeUrl);
                    return response.json();
                })
            );

            const episodeDetailsMap = episodeDetails.reduce((acc, episode) => {
                acc[episode.url] = episode;
                return acc;
            }, {});

            setEpisodeDetails(episodeDetailsMap);
        };

        fetchEpisodeDetails();
    }, [characters]);

    return (
        <div className="row">
            {characters.map((character, index) => {
                const createdDate = new Date(character.created);
                const formattedDate = `${createdDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${(createdDate.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${createdDate.getFullYear()}`;

                return (
                    <div key={index} className="col">
                        <div className="card" style={{ minWidth: "200px" }}>
                            <img src={character.image} alt="" className="img-thumbnail" />
                            <div className="card-body">
                                <h5>{character.name}</h5>
                                <p>id: {character.id}</p>
                                <p>Status: {character.status}</p>
                                <p>Species: {character.species}</p>
                                <p>Origin: {character.origin.name}</p>
                                <p>Location: {character.location.name}</p>
                                <p>Gender: {character.gender}</p>
                                <p>Created: {formattedDate}</p>
                                <p>
                                    Episodes: {character.episode.length}
                                    <span
                                        onClick={() => toggleEpisodes(character.id)}
                                        style={{ color: "blue" }}
                                    >
                                        {expandedEpisodes[character.id] ? " (Hide)" : " (Show)"}
                                    </span>
                                </p>
                                {expandedEpisodes[character.id] && (
                                    <ul>
                                        {character.episode.map((episodeUrl, episodeIndex) => {
                                            const episode = episodeDetails[episodeUrl];
                                            return (
                                                <li key={episodeIndex}>
                                                    <a
                                                        href={episodeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Episode {episode.id} : {episode?.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="col"></div>
        </div>
    );
};

export default Character;
