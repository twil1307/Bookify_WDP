import {
    BasicInfomation,
    ExtraInformation, 
    ImageSection,
    RoomInfomation,
    AmenityInformation,
} from "./components";

const tabs = [
    {
        id: 0,
        render: (setNextTabValid) => {
            return <BasicInfomation setNextTabValid={setNextTabValid} />
        } 
    },
    {
        id: 1,
        render: (setNextTabValid) => {
            return <AmenityInformation setNextTabValid={setNextTabValid} />
        } 
    },
    {
        id: 2,
        render: (setNextTabValid) => {
            return <RoomInfomation setNextTabValid={setNextTabValid}/>
        } 
    },
    {
        id: 3,
        render: (setNextTabValid) => {
            return <ImageSection setNextTabValid={setNextTabValid}/>
        } 
    },
    {
        id: 4,
        render: (setNextTabValid) => {
            return <ExtraInformation setNextTabValid={setNextTabValid}/>
        } 
    },
]

export default tabs;