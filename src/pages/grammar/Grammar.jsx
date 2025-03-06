import { useState } from "react";
import "../styles/Grammar.css"; // We’ll create this next
import { Link } from 'react-router-dom';

function Grammar() {
  const [activeSection, setActiveSection] = useState(null); // Toggle sections for interactivity

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="grammar-container">
      <h2>Grammar</h2>
      <p className="intro">
      Hey there! Grammar is like the set of rules that helps us put words together in a way that makes sense when we talk or write. Imagine it’s like a game: if you follow the rules—like using “is” instead of “are” for one person, or adding an “s” to show more than one thing—everyone understands what you mean! It helps us say things clearly, like “The cat runs” instead of “Cat run the,” which sounds all mixed up. Without grammar, our sentences would be a big jumble,and nobody would know what we’re trying to say. 
      </p>

      {/* Parts of Speech */}
      <div className="grammar-card">
        <h3 onClick={() => toggleSection("parts")}>Parts of Speech</h3>
        {activeSection === "parts" && (
          <div className="content">
            <p>
            Alright, let’s dive into parts of speech! Think of them as the building blocks of sentences, like how you use different Lego pieces to build something awesome.
            </p>
            <p>There are eight main parts of speech, and each one has a special job:</p>
            <ol>
                <li><em>Nouns</em> are naming words—like “dog,” “school,” or “pizza”—that tell us about people, places, or things.  </li>
                <li><em>Pronouns</em> are words like “he,” “she,” or “they” that take the place of nouns. </li>
                <li><em>Verbs</em> are action words—like “run,” “jump,” or “think”—that tell us what someone or something is doing. </li>
                <li><em>Adjectives</em> are describing words—like “big,” “happy,” or “blue”—that tell us more about nouns. </li>
                <li><em>Adverbs</em> are words like “quickly,” “often,” or “very” that describe verbs, adjectives, or other adverbs. </li>
                <li><em>Prepositions</em> are words like “in,” “on,” or “between” that show the relationship between nouns and other words in a sentence. </li>
                <li><em>Conjunctions</em> are words like “and,” “but,” or “because” that connect words, phrases, or sentences. </li>
                <li><em>Interjections</em> are words like “wow,” “ouch,” or “yay” that show strong feelings or emotions. </li>
            </ol>
            <p>Together, these parts team up to make sentences clear and exciting. For example, in “The silly cat jumped high,” you’ve got a noun (cat), adjective (silly), verb (jumped), and adverb (high) working together. </p>
          </div>
        )}
      </div>

      {/* Tenses */}
      <div className="grammar-card">
        <h3 onClick={() => toggleSection("tenses")}>Tenses</h3>
        {activeSection === "tenses" && (
          <div className="content">
            <p>
            let’s talk about tense! Tense is like a time machine for words—it tells us when something happens in a sentence. It’s all about the verb, which is the action word, and how we change it to show if something is happening now, already happened, or will happen later. 
            </p>
            <p>There are three main tenses</p>
            <ul>
              <li>Present: "The study <em>explains</em> the phenomenon."</li>
              <li>Past: "The experiment <em>showed</em> clear results."</li>
              <li>Future: "Researchers <em>will investigate</em> further."</li>
            </ul>
            <p>Let's dive in</p>
            <h4>Present Tense (happening now)</h4>
            <p>Present tense is for things that are happening right now or are always true. It’s like a snapshot of the present moment. For example, “The sun shines” or “She reads books.”</p>
            <ol>
                <li><b>Simple Present: </b>For habits, facts, or routines.<br/><i>Example: “I play soccer every day.”</i></li>
                <li><b>Present Continuous:</b>For something happening right now or temporary.<br/><i>Example: “I play soccer every day.”</i></li>
                <li><b>Present Perfect: </b>For something that started in the past and matters now.<br/><i>Example: “I have just played soccer.”</i></li>
                <li><b>Present Perfect Continuous: </b>For something that started in the past and is still going.<br/><i>Example: “I have been playing soccer for an hour.”</i></li>
            </ol>
            <h4>Past Tense (already happened)</h4>
            <p>Past tense is for things that already happened. It’s like looking back at a memory. For example, “The cat slept” or “They ate pizza.”</p>
            <ol>
                <li><b>Simple Past: </b>For actions that happened in the past.<br/><i>Example: “I played soccer yesterday.”</i></li>
                <li><b>Past Continuous: </b>For actions that were happening in the past.<br/><i>Example: “I was playing soccer when it started raining.”</i></li>
                <li><b>Past Perfect: </b>For actions that happened before another action in the past.<br/><i>Example: “I had played soccer before it started raining.”</i></li>
                <li><b>Past Perfect Continuous: </b>For actions that started in the past and continued until another action in the past.<br/><i>Example: “I had been playing soccer for an hour when it started raining.”</i></li>
            </ol>
            <h4>Future Tense (will happen later)</h4>
            <p>Future tense is for things that will happen later. It’s like looking forward to something. For example, “The dog will bark” or “We will travel.”</p>
            <ol>
                <li><b>Simple Future: </b>For actions that will happen in the future.<br/><i>Example: “I will play soccer tomorrow.”</i></li>
                <li><b>Future Continuous: </b>For actions that will be happening in the future.<br/><i>Example: “I will be playing soccer when you arrive.”</i></li>
                <li><b>Future Perfect: </b>For actions that will be completed before another action in the future.<br/><i>Example: “I will have played soccer before you arrive.”</i></li>
                <li><b>Future Perfect Continuous: </b>For actions that will be ongoing before another action in the future.<br/><i>Example: “I will have been playing soccer for an hour when you arrive.”</i></li>
            </ol>

          </div>
        )}
      </div>

      {/* Modals */}
      <div className="grammar-card">
        <h3 onClick={() => toggleSection("modals")}>Modals</h3>
        {activeSection === "modals" && (
          <div className="content">
            <p>
            Modals are special helper verbs that add extra meaning to the main verb in a sentence. They tell us about things like possibility, permission, ability, or necessity—kind of like giving your sentence a superpower! 
            </p>
            <p>Common modals include words like “can,” “could,” “may,” “might,” “will,” “would,” “shall,” “should,” “must,” and “ought to.”</p>
            <ol>
                <li><b>Can: </b>For ability or permission.<br/><i>Example: “I <em>can</em> swim.”</i></li>
                <li><b>Could: </b>For past ability or polite requests.<br/><i>Example: “I <em>could</em> swim when I was younger.”</i></li>
                <li><b>May: </b>For permission or possibility.<br/><i>Example: “You <em>may</em> leave early.”</i></li>
                <li><b>Might: </b>For possibility or uncertainty.<br/><i>Example: “It <em>might</em> rain later.”</i></li>
                <li><b>Will: </b>For future actions or predictions.<br/><i>Example: “I <em>will</em> call you later.”</i></li>
                <li><b>Would: </b>For polite requests or hypothetical situations.<br/><i>Example: “I <em>would</em> like some water, please.”</i></li>
                <li><b>Shall: </b>For suggestions or offers.<br/><i>Example: “Shall we go for a walk?”</i></li>
                <li><b>Should: </b>For advice or obligation.<br/><i>Example: “You <em>should</em> study for the test.”</i></li>
                <li><b>Must: </b>For strong advice or necessity.<br/><i>Example: “You <em>must</em> finish your homework.”</i></li>
                <li><b>Ought to: </b>For advice or duty.<br/><i>Example: “You <em>ought to</em> help your parents.”</i></li>
            </ol>
        </div>
        )}
      </div>

      {/* Passive Voice */}
      <div className="grammar-card">
        <h3 onClick={() => toggleSection("passive")}>Active and Passive Voice</h3>
        {activeSection === "passive" && (
          <div className="content">
            <p>
            <strong>Active and passive voice!</strong> These are two ways to build sentences based on who’s doing the action and how we <b>focus</b> on it.
            </p>
            <p><b>Active Voice</b></p>
            <p>In active voice, the subject of the sentence is the one doing the action—it’s straightforward and full of energy. For example, “The dog chased the cat.” Here, “the dog” (subject) is doing the chasing (action), and “the cat” is getting chased. It’s clear who’s in charge of the action!</p>
            <p><b>Passive Voice</b></p>
            <p>In passive voice, the focus flips—the subject isn’t doing the action; it’s receiving it. The sentence gets rearranged, and the doer might even disappear. For example, “The cat was chased by the dog” is passive. Now “the cat” (subject) is just sitting there being chased, and “by the dog” tells us who did it—though sometimes we skip that part, like “The cat was chased.” Passive voice often uses a form of “to be” (like “was”) plus the past participle of the verb (like “chased”).</p>
            <p>Let’s compare the structure of active and passive voice side by side so you can see how they work! Both show action, but they switch up who’s in the spotlight and how the sentence is built.</p>
            <div className="comparision">
                <div>
                    <h1>Active Voice</h1>
                    <ul>
                        <li><b>Formula: </b> Subject + Verb + Object</li>
                        <li>The subject does the action, and the object receives it. </li>
                        <li><b>Example: </b>“The chef (subject) cooked (verb) the meal (object).”  </li>
                        <li>Breakdown:<br/>
                            <ul>
                                <li><b>Subject: </b><i>The Chief</i></li>
                                <li><b>Verb: </b><i>cooked</i></li>
                                <li><b>Object: </b><i>the meal</i></li>
                            </ul>
                        </li>
                        <li>It is direct and shows the doer upfront</li>
                    </ul>
                </div>
                <div>
                    <h1>Passive Voice</h1>
                    <ul>
                        <li><b>Formula: </b> Object + Verb + Subject</li>
                        <li>The object receives the action, and the subject is less important. </li>
                        <li><b>Example: </b>“The meal (object) was cooked (verb) by the chef (subject).”  </li>
                        <li>Breakdown:<br/>
                            <ul>
                                <li><b>Object: </b><i>the meal</i></li>
                                <li><b>Verb: </b><i>was cooked</i></li>
                                <li><b>Subject: </b><i>by the chef</i></li>
                            </ul>
                        </li>
                        <li>It is indirect and shows the receiver upfront</li>
                    </ul>
                </div>              

                

            </div>
        </div>
        )}
      </div>

      {/* Conditionals */}
      <div className="grammar-card">
        <h3 onClick={() => toggleSection("conditionals")}>Conditionals</h3>
        {activeSection === "conditionals" && (
            <div className="content">
                <p>
                Alright, let’s explore conditionals! Conditionals are sentences that show a “what if” situation—they tell us what happens (or might happen) if something else is true. They’re like a cause-and-effect team-up, with two parts: the if clause (the condition) and the main clause (the result). In English, we have four main types of conditionals, each tied to different times and possibilities. Here’s the rundown:
                </p>
                <ol>
                    <li>
                        <p><b>Zero Condtional</b></p>
                        <ul>
                            <li><b>When: </b>For things that are always or generally true (facts).</li>
                            <li><b>Structure: </b>If + present simple, present simple.</li>
                            <li><b>Example: </b><i>If you heat water, it boils.</i></li>
                            <li><b>Meaning: </b>This always happens—heat water, and boom, it boils!</li>
                        </ul>
                    </li>
                    <li>
                        <p><b>First Conditional</b></p>
                        <ul>
                            <li><b>When: </b>For possible or likely future events.</li>
                            <li><b>Structure: </b>If + present simple, will + base verb.</li>
                            <li><b>Example: </b><i>If it rains, I will stay home.</i></li>
                            <li><b>Meaning: </b>This could happen—rain, and I might stay home.</li>
                        </ul>
                    </li>
                    <li>
                        <p><b>Second Conditional</b></p>
                        <ul>
                            <li><b>When: </b>For unlikely or imaginary future events.</li>
                            <li><b>Structure: </b>If + past simple, would + base verb.</li>
                            <li><b>Example: </b><i>If I won the lottery, I would buy a mansion.</i></li>
                            <li><b>Meaning: </b>This probably won’t happen—I win the lottery, and I dream of a mansion.</li>
                        </ul>
                    </li>
                    <li>
                        <p><b>Third Conditional</b></p>
                        <ul>
                            <li><b>When: </b>For past events that didn’t happen.</li>
                            <li><b>Structure: </b>If + past perfect, would have + past participle.</li>
                            <li><b>Example: </b><i>If I had studied harder, I would have passed the test.</i></li>
                            <li><b>Meaning: </b>This is a missed chance—I didn’t study, so I didn’t pass.</li>
                        </ul>
                    </li>
                </ol>
                <p>Conditionals mix tenses to show how real or likely something is. Zero is for sure things, first is for maybe, second is for dreams, and third is for regrets or alternate pasts. You can even blend them for tricky situations, like “If I had saved money (past), I would be rich now (present).” </p>
            </div>
        )}
      </div>
            <div className="road">
                <Link to='/games/sentences' className='normal-link '> <button>Back</button> </Link>
                <Link to='/games/grammar' className='normal-link '> <button>Next</button> </Link>
            </div>
    </div>
  );
}

export default Grammar;