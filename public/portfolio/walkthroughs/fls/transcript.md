# Fidelity Ladder System

From intent to evidence. All depicted expedition states are illustrative.

## 1. The expensive place to be wrong

Code is the most expensive place to discover you built the wrong thing. Plenty of tools can tell you whether code works. Almost nothing tells you whether it was worth building — and that question is cheapest to answer before anyone writes a line of it. This is the Fidelity Ladder System, running against a product that really exists.

## 2. It only moves one way

So the work climbs. A request becomes a written spec, then drawings, then something you can click, then real code — and every step is cheap to be wrong at compared to the one after it. It only moves one way. The rules only ever get stricter as they pass down, never looser, and nothing gets to skip a step because it feels confident.

## 3. It ends at a gate

A person decides every step that cannot be taken back. Nothing advances on optimism: a check that did not run is never reported as passed, and anything uncertain stops and waits. When a step fails, the work drops back down and writes down what it learned, so the next attempt knows more than the last. And every step says what it cost. The value here is the gates that are kept, not the ones removed.

## 4. Request

Here is the same system from the outside. You give a name and a shared passcode, so the record says who asked. Then you type one sentence about Pocket, a poker app that really exists: what you want changed, and how you would know it worked. Nothing runs until you press the button, and only one request runs at a time. It gets checked against what this product is for — and it can come back asking for more to go on.

## 5. Wireframe

The first thing back is three rough shapes. They are real drawings in a real design file, and they differ in shape rather than in wording — three different answers, not three ways of saying one. You pick the one you want built. The other two stay on the page afterwards, so you can still see what was not taken.

## 6. Preview

Next comes a clickable version of the shape you picked, built from the product's own design system. It asks a plain question: is this the right thing? The preview is a throwaway — it exists so you can judge the direction before anyone writes real code. If it is wrong, you say what to change, and that sends the step back to be done again with your note attached. It does not start over, and it does not skip ahead.

## 7. Build

Then it writes the code, in an isolated copy of the project, and runs the project's own tests. It does not take the agent's word that they passed; the tests are run again here, and that result is the one that counts. What comes back is not a receipt. It is your change, running on a copy of the real app, with the switch already flipped on in the link so you can actually see it. While the checks run, nothing needs you.

## 8. Ship

The yes you just gave is the one that merges it. That is safe to ask for once, because every change arrives with its feature flag off in both environments — merging moves the code, it does not release the feature. Only then does it show you what it did and ask you to sign off. Turning the flag on is a separate decision, made later, by a person, outside all of this.

## 9. Your turn

Five steps, and a person decided every one of them. The cost is on the page the whole way, because a system that hides what it spends is asking to be trusted instead of checked. None of this makes an agent safer to leave alone. It makes being wrong cheap, and it keeps clear ownership of every decision. You can go and run one yourself, or read the whole thing — it is open source.

[Visitor demo](https://harness.n8plusus.com/demo/) | [Public source](https://github.com/nhunsaker/fidelity-ladder-system)
