import '../styles/Sentence.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Sentences() {
    const [activeSection, setActiveSection] = useState(null);
    
    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className='sentence'>
            <h1>Sentence</h1>
            
            {/* Definition Section */}
            <div className='sentence-card'>
                <h2 onClick={() => toggleSection("definition")} className="clickable">Definition of a Sentence</h2>
                {activeSection === "definition" && (
                    <section className='content'>
                        <p>A sentence is an arrangement of words that makes <b>complete sense</b>.</p>
                        <p>Every sentence tells something about a <b>subject</b> which may be a <b>person, place, or thing</b>.</p>
                        <p>Examples:</p>
                        <ul>
                            <li><b>Mary</b> is singing a song. (Subject: Mary)</li>
                            <li><b>John</b> eats a banana. (Subject: John)</li>
                            <li><b>Stop!</b> (Subject: You - implied)</li>
                        </ul>
                    </section>
                )}
            </div>

            {/* Types of Sentences Section */}
            <div className='sentence-card'>
                <h2 onClick={() => toggleSection("types")} className="clickable">Types of Sentences</h2>
                {activeSection === "types" && (
                    <section className='content'>
                        <div className='typeContent'>
                            <h3>1. Statement</h3>
                            <p>Statements provide information or facts.</p>
                            <p>Examples:</p>
                            <ul>
                                <li>Clouds bring rain.</li>
                                <li>I have not seen her for a long time.</li>
                            </ul>
                        </div>
                        <div className='typeContent'>
                            <h3>2. Interrogative</h3>
                            <p>These sentences ask questions.</p>
                            <p>Examples:</p>
                            <ul>
                                <li>What is your name?</li>
                                <li>Is she a pretty girl?</li>
                            </ul>
                        </div>
                        <div className='typeContent'>
                            <h3>3. Imperative</h3>
                            <p>These sentences express commands, requests, or suggestions.</p>
                            <p>Examples:</p>
                            <ul>
                                <li>Lend me your pen, please.</li>
                                <li>Get ready to dance.</li>
                            </ul>
                        </div>
                        <div className='typeContent'>
                            <h3>4. Exclamatory</h3>
                            <p>Expresses strong emotions like surprise, anger, or joy.</p>
                            <p>Examples:</p>
                            <ul>
                                <li>What a surprise!</li>
                                <li>Terrible!</li>
                            </ul>
                        </div>
                    </section>
                )}
            </div>

            {/* Structure of a Sentence Section */}
            <div className='sentence-card'>
                <h2 onClick={() => toggleSection("structure")} className="clickable">Structure of a Sentence</h2>
                {activeSection === "structure" && (
                    <section className='content'>
                        <p>Every sentence has two parts: <b>Subject</b> and <b>Predicate</b>.</p>
                        <ul>
                            <li><span className="subject">Alice</span> <span className="predicate">danced very well.</span></li>
                            <li><span className="subject">Boys from the next block</span> <span className="predicate">broke the street lamp.</span></li>
                        </ul>
                    </section>
                )}
            </div>

            {/* Parts of Speech Section */}
            <div className='sentence-card'>
                <h2 onClick={() => toggleSection("partsOfSpeech")} className="clickable">Parts of Speech</h2>
                {activeSection === "partsOfSpeech" && (
                    <section className='content'>
                        <p>Words in a sentence have different <b>functions</b>.</p>
                        <ol>
                            <li>Noun</li>
                            <li>Pronoun</li>
                            <li>Adjective</li>
                            <li>Verb</li>
                            <li>Adverb</li>
                            <li>Preposition</li>
                            <li>Conjunction</li>
                            <li>Interjection</li>
                        </ol>
                    </section>
                )}
            </div>
            
            {/* Navigation Buttons */}
            <div className='road'>
                <Link to='/lesson1' className='normal-link'><button>Back</button></Link>
                <Link to='/games/sentences' className='normal-link'><button>Next</button></Link>
            </div>
        </div>
    );
}