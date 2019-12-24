// Used to store the value of the `hc` attribute of the <html> element
// so we can restore it when exiting fullscreen
let deluminateMode = "";

// Store the root <html> element so that we can add and remove
// the `hc` attribute that Deluminate uses to know when and how
// to invert the colors
const html = document.documentElement;

// This is the element that scrolls when in fullscreen
const ytdApp = document.getElementsByTagName("ytd-app")[0];

// Run this code each time we enter or exit fullscreen
document.addEventListener("fullscreenchange", function() {

	// We've entered fullscreen if a fullscreen element exists
	if (document.fullscreenElement) {

		// Get the value of the `hc` attribute on the <html> element
		// and store it so we can restore it whenever fullscreen is exited
		deluminateMode = html.getAttribute("hc");

		// Remove the `hc` attribute from the <html> element
		// This tells Deluminate to stop inverting the colors
		html.removeAttribute("hc");

		// Run the `deluminateOnScroll` function each time we scroll
		// while in fullscreen
		ytdApp.addEventListener("scroll", deluminateOnScroll, true);
	}
	// We've exited fullscreen
	else {
		// Stop running the `deluminateOnScroll` function each time
		// we scroll since we're out of fullscreen
		ytdApp.removeEventListener("scroll", deluminateOnScroll, true);

		// Turn Deluminate back on since we're out of fullscreen
		html.setAttribute("hc", deluminateMode);
	}
});

// YouTube has a feature where you can scroll while in fullscreen
// so you can read the comments, browse videos, etc without exiting fullscreen

// But since we're still technically in fullscreen, Deluminate will
// still be turned off, blinding your eyes if you decide to scroll down

// So instead of that, we de-de-deluminate, turning it back to dark
function deluminateOnScroll() {
	// If we aren't in dark mode and have scrolled down a bit
	// while in fullscreen mode, turn it to dark mode
	if (!html.hasAttribute("hc") && ytdApp.scrollTop > 0) {
		html.setAttribute("hc", deluminateMode);
	}
	// If we are already in dark mode from scrolling down before, and
	// have now scrolled back to the top, returning to the fullscreened video,
	// turn it back to light mode
	else if (html.hasAttribute("hc") && ytdApp.scrollTop === 0) {
		html.removeAttribute("hc");
	}
}
