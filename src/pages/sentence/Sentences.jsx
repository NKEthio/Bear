import '../styles/Sentence.css';
import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';

export default function Sentences() {
    const [activeSection, setActiveSection] = useState(null); // Toggle sections for interactivity
    
    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
      };
    return (
        <div className='sentence'>
            <h1>Sentence</h1>
            <div className='sentence-card'>
            <h2 onClick={() => toggleSection("definition")} id="def">Definition of sentence</h2>
            { activeSection === "definition" && (
                <section id="definition">
                <div id="definitionSentence">
                    <p>A sentence is an arrangement of words that makes <b> complete sense</b>.</p>
                    <p>Every sentence tells something about a <b>subject</b> which may be a <b>person, place or thing</b>.</p>        
                    <p>Look carefully the following examples. </p>
                    <p>1. <b>Mary</b> is singing a song. As you can see the sentence is telling us about <b>mary</b> which is the subject. </p>
                    <p>2. <b>John</b> eats banana. Since the sentence is talking about John, the subject is John.</p>
                    <p>3. <b>Stop!</b> Because the sentence is ordering <b>you</b> it's subject is <b>you</b>.</p>
                </div>
            </section>
            )

            }
            </div>

            <div className='sentence-card'>
                <h2 onClick={() => toogleSection("types")}>Types of sentence</h2>
                {activeSection==="types" && (
                    <div id="typecontent">
                    <div class="typeContent">
                        <h3>1. Statment</h3>
                        <p>Statments are sentences that give facts or describe things or events.</p>
                        <p>Examples: 
                            <br/> Cloud bring us rain.
                            <br/> I have not seen her for a long time.
                        </p>
                        <p>The above two given examples are statments.</p>
                        <p>The first example is affirmative(positive) statment and the second one is negative( which have the word "NOT").</p>
                    </div>
                    <div class="typeContent">
                        <h3>2. Interrogative</h3>
                        <p>Introgative sentences ask questions.</p>
                        <p>Example: </p>
                        <p>What is your name? <br/>Is she pretty girl? </p>
                    </div>
                    <div class="typeContent">
                        <h3>3. Imperative</h3>
                        <p>Imperative sentences make requests, commands or suggestions.</p>
                        <p>Examples</p>
                        <p>Lend me your pen please <br/> 
                            Get ready to dance.</p>
                    </div>
                    <div class="typeContent">
                        <h3>4. Exclamatory</h3>
                        <p>We use Exclamatory sentences to express surprise, anger, regret, joy etc.</p>
                        <p>Examples</p>
                        <p>What a surprise! <br/>Terrible!</p>
                        <p>Recognise the difference in punctuation?</p>
                    </div>
                </div>
                )};

            </div>

            

            <section id="structure">
                <h2>Structure of a sentence</h2>
                <div id="struSentence">
                    <p>Every sentence has two parts <b>a subject</b> and <b>a predicate.</b></p>
                    <p><b>The subject</b> is a person, place or thing about which something is said in a sentence.</p>
                    <p><b>The predicate</b> says something about the subject.</p>
                    <p>The normal word-order in English is, Subject + Predicate. And since there can be no sentence without a verb, the smallest English sentence must have the structure Subject(S)+Verb(V).</p>            <p class="tohide">
                        In the following examples the subject is given by green and the predicate is given by red color.
                        Examples:<br/>
                        <ul id="sentstru">
                            <li><span class="subject">Alice</span><span class="predicate"> danced very well</span></li>
                            <li><span class="subject">All of us </span><span class="predicate">have seen this picture</span></li>
                            <li><span class="subject">Boys from the next block </span><span class="predicate">broke the street lamp.</span></li>
                        </ul>
                    </p>
                </div>
            </section>

            <section id="partsOfSpeech">
                <h2>Parts of speech</h2>
                <p>Parts of speech are  words in a sentence with different <b>functions</b>.</p>
                <ol>
                    <li>Noun </li>
                    <li>Pronoun</li>
                    <li>Adjective</li>
                    <li>Verb</li>
                    <li>Adverb</li>
                    <li>Preposition</li>
                    <li>Conjuntion</li>
                    <li>Interjection</li>
                </ol>
                
                <div class="partCollection">
                    <div id="noun" class="partsContent">
                        <h3>Noun</h3>
                        <p>
                            Noun is a word that is used for giving a name to a person, place, thing, quality, idea or action.</p>
                        <p>Examples</p>
                        <ol>
                            <li><span class="exnoun">Addis Ababa</span> is the capital city of <span class="exnoun">Ethiopia</span>.</li>
                            <li>The <span class="exnoun">water</span> here is very <span class="exnoun">cold</span>.</li>
                            <li><span class="exnoun">Elham</span> is a clever <span class="exnoun">student</span>.</li>
                            <li><span class="exnoun">Sickness</span> is a great <span class="exnoun">curse</span>.</li>
                            <li>On <span class="exnoun">sunday</span> <span class="exnoun">George</span> and his <span class="exnoun">friends</span> went to the <span class="exnoun">beach</span>.</li>
                        </ol>
                    </div>
                    <div id="pronoun" class="partsContent">
                        <h3>Pronoun </h3>
                        <p>Pronoun is a word that can be used<b> in place of a noun</b>.</p>
                        <p>Examples</p>
                        <ol>
                            <li><span class="expron">I</span> know <span class="expron">her</span>.</li>
                            <li><span class="expron">She</span> is annoyed by <span class="expron">him</span>.</li>
                            <li>Kebede told <span class="expron">me</span> <span class="expron">he</span> was going Hawassa. </li>
                            <li><span class="expron">He</span> talks in funny way.</li>
                            <li><span class="expron">I</span> do not like <span class="expron">it</span>.</li>
                        </ol>
                    </div>

                    <div id="adjective" class="partsContent">
                        <h3>Adjective</h3>
                        <p>Adjective is a type of a word is used to <b>add</b> something to the <b>meaning</b> of a <b>noun</b>.</p>
                        <p>Examples</p>
                        <ol>
                            <li>The <span class="exadje">fat</span> boy is coming.</li>
                            <li>A <span class="exadje">little</span> patience will help.</li>
                            <li><span class="exadje">Your</span> book is with me.</li>
                            <li>The <span class="exadje">black</span> T-shirt is mine.</li>
                            <li><span class="exadje">Which</span> pen yours?</li>
                        </ol>
                    </div>

                    <div id="verb" class="partsContent">
                        <h3>Verb</h3>
                        <p>A verb is a word that tells us what something or someone does, what state something or someone is in, or what is becoming something or someone.</p>
                        <p>Examples</p>
                        <ol>
                            <li>The little girl <span class="exverb">spoke</span> sweetly to the stranger.</li>
                            <li>The cat <span class="exverb">is sitting</span> on the roof.</li>
                            <li>My brother <span class="exverb">has</span> a car.</li>
                            <li>The baby <span class="exverb">cried</span>.</li>
                            <li>He <span class="exverb">gave</span> me the book.</li>
                        </ol>    
                    </div>

                    <div id="adverb" class="partsContent">
                        <h3>Adverb</h3>
                        <p>An adverb qualifies or adds to the meaning of a verb or an adjective.</p>
                        <p>Examples</p>
                        <ol>
                            <li>The horse ran <span class="exadve">fast</span>.</li>
                            <li>The rains were <span class="exadve">quite</span> heavy.</li>
                            <li>Kemila writes <span class="exadve">clearly</span>.</li>
                            <li>Our teacher is <span class="exadve">always</span> punctual.</li>
                            <li>She is <span class="exadve">alittle</span> worried about her studies.</li>
                        </ol>
                    </div>

                    <div id="preposition" class="partsContent">
                        <h3 class="tohide">Preposition <span class="tobe" lang="am"></span></h3>
                        <p class="tohide">
                            A preposition is a word placed usually before a noun or a noun phrase to show its relation to some other word or words in a sentence.
                            <span class="tobe" lang="am"></span>
                        </p>
                        <p>Examples</p>
                        <ol>
                            <li> She can speak <span class="exprep">to</span> a stranger.</li>
                            <li>Fishes live <span class="exprep">in</span> water.</li>
                            <li>He hid himself <span class="exprep">behind</span> the tree.</li>
                            <li>She waited <span class="exprep">for</span> some time.</li>
                            <li>He is good <span class="exprep">at</span> hunting.</li>
                        </ol>
                    </div>

                    <div id="conjuction" class="partsContent">
                        <h3>Conjuction </h3>
                        <p>A conjuction is word that is used for joining words, phrases, clause and sentences.</p>
                        <p>Examples</p>
                        <ol>
                            <li>Work hard <span class="exconj">or</span> you will fail.</li>
                            <li>You can go <span class="exconj">either</span> by train <span class="exconj">or</span> by bus.</li>
                            <li>He is strong <span class="exconj">and</span> healthy.</li>
                            <li>Will you have tea <span class="exconj">or</span> coffee.</li>
                            <li>She smiled <span class="exconj">but</span> did not talk.</li>
                        </ol>
                    </div>

                    <div id="interjection" class="partsContent">
                        <h3>Interjection</h3>
                        <p>Interjection is a word that we use to express some feeling of the mind.</p>
                        <p>Examples</p>
                        <ol>
                            <li><span class="exinte">Bravo!</span> You scored good on the exam.</li>
                            <li><span class="exinte">Wow!</span> Your eyes are beautiful.</li>
                            <li><span class="exinte">Oh!</span> So you are trouble-maker.</li>
                            <li><span class="exinte">Eh!</span> It is embarassing.</li>
                            <li><span class="exinte">Hey!</span> Let us dance.</li>
                        </ol>
                    </div>
                </div>
            </section>
            <div className='road'>
                <Link to='/lesson1' className='normal-link '> <button>Back</button> </Link>
                <Link to='/games/sentences' className='normal-link '> <button>Next</button> </Link>
            </div>
        </div>
    );
};