import React from 'react'
import './Home.css'
import Ayurvedalogo from "../assets/ayurveda-quote-charaka.png"
import DRCard from './card'
import Doctorscards from './Doctorscards'

export default function Home() {
  return (
    <>
    <div className='home-container'>
        <div className='ayurveda-tour'>
            <div className='col-1'>
                <div>Health is not just the absence of disease, but a state of complete physical, mental, and social well-being.” 
                    – World Health Organization</div>
                <div>Because we cannot scrub our inner body we need to learn a few skills to help cleanse our tissues, organs, and mind. This is the art of Ayurveda.</div>
                <div>"व्यायामात् लभते स्वास्थ्यं दीर्घायुष्यं बलं सुखं।

                आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम्॥"</div>
            <div>svastiprajābhyaḥ paripālayantāṃ nyāyena mārgeṇa mahīṃ mahīśāḥ।
            gobrāhmaṇebhyaḥ śubhamastu nityaṃ lokāḥ samastāḥ sukhino bhavantu॥</div>
            </div>
            <div className='col-2'>
                <img src={Ayurvedalogo} alt="logo images" />
            </div>
        </div>
        <div>
        <Doctorscards/>
        </div>
    </div>
    </>
  )
}
