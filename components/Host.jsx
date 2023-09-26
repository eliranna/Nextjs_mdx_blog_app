import Avatar from "./Avatar"
import { fontSize, spacing } from "../style"

export default function Host() {

    const wrapper = {
        display: "flex",
        flexDirection: "column",
        gap: spacing.spacing4
    }

    const avatar = {
        display: "flex",
        justifyContent: "center"
    }

    const content = {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: spacing.spacing2
    }

    const name = {
       fontSize: fontSize.fontSize4,
       fontWeight: 300
    }

    const desc = {
        fontSize: fontSize.fontSize3,
        fontWeight: 300,
        display: "flex",
        justifyContent: "center"    
    }

    const descCaption = {
        maxWidth: "250px"   
    }
 
    return (
        <div style={wrapper}>
            <div style={avatar}>
                <Avatar/>
            </div>
            <div style={content}>
                <div style={name}>
                    Eliran Natan
                </div>
                <div style={desc}>
                    <div style={descCaption}>Writes about Generative AI Adoption for Enterprises</div>
                </div>
            </div>
        </div>
    )
}