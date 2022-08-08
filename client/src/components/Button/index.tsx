import './index.css'

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    specialProp?: string;
}
export default function Button(props: ButtonProps) {
    const { specialProp, ...rest } = props
    return (
        <div className="group_button">
            <button {...rest} />
        </div>
    )
}