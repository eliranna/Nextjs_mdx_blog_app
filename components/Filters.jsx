import { color, fontSize, spacing } from '../style';

export default function Filters({filters, selectedFilter, onFilterSelect}) {

    const wrapper = {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        gap: spacing.spacing8
    }

    const tag = {
        fontSize: fontSize.fontSize2,  
        fontWeight: "500",
        cursor: "pointer",
        borderRadius: "50px",
        padding: `${spacing.spacing1} ${spacing.spacing2}`,
        textAlign: "center",
        transition: "all 0.35s",
        border: "1px solid transparent"
    }

    const tagSelected = {
        ... tag,
        ... {
            backgroundColor: color.black,
            color: color.white,
            border: "1px solid white"
        }
    }

    return (
        <div style={wrapper}>
            {
                filters.map(filter => {
                    return (
                        <div style={selectedFilter === filter.id ? tagSelected : tag} onClick={() => onFilterSelect(filter.id)}>
                            {filter.caption}
                        </div>
                    )
                })
            }
        </div>
    )
}