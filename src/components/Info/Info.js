import InfoItem from "./InfoItem.js";

function Info() {

    return (    
        <div className="info-container">
            <InfoItem header='Bass vs SPL'>
                Indicates how low the speaker can play compared to total SPL. Bigger number indicates better product.
            </InfoItem>
            <InfoItem header='SPL Performance'>
                Indicates how loud the speaker can play compared to its size, in dBs. The bigger number indicates the better product.
            </InfoItem>
            <InfoItem header='Bass Performance'>
                Indicates how low the speaker can play compared to its size. Bigger number indicates better product.
            </InfoItem>
            <InfoItem header='Flatness Rating'>
                Indicates how flat the frequency response is between the 160 Hz-16000 kHz. Bigger number indicates flatter frequency response (=less peaks or dips).
            </InfoItem>
            <InfoItem header='Preference Rating'>
                Value indicates how listener would prefer the speaker, higher value means higher preference, maximum is 10. Calculation here factors in the total SPL (-10dB point - 20kHz), how low the speaker plays, size of the speaker and how flat the frequency response is. These values have different coefficient in the calculations.
                <br /><br />*Preference rating calculation is based on Floyd Toole's research on acoustics and psychoacoustics in small rooms and the evaluation of the loudspeakers.
            </InfoItem>
            <InfoItem header='SPL'>
                Calculates the total dB level from the operation range. SPL is calculated from the speaker's -10dB point to 20kHz range. Please note the SPL calculations are with maximum volume and no user EQ!!
            </InfoItem>
            <InfoItem header='Average'>
                Horizontal green line shows the calculated average between all of the products, excluding the targer values.
            </InfoItem>
        </div>
    );
}

export default Info;