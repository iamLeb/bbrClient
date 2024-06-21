import { IoChatboxEllipsesOutline } from "react-icons/io5";

const Contact = () => {
    return (
        <section className={'py-4'}>
            <p className={'text-center'}>Become our next customer, and find your dream home Contact us: 314-555-0123</p>

            <div className={'flex justify-around items-center py-24'}>
                <div>Left</div>

                <div>
                    <div className={'bg-white rounded-lg shadow-2xl p-8'}>
                        <div className={'flex justify-between items-center space-x-4'}>
                            <div>
                                <h1 className={'text-3xl font-bold'}>Contact us</h1>
                                <p className={'text-gray-500 text-sm pt-3'}>We will respond as soon as we receive your
                                    message.</p>
                            </div>
                            <IoChatboxEllipsesOutline className={'text-primary '} size={32} />
                        </div>

                        <form className={'flex flex-col gap-4'}>
                            <div className={'pt-5'}>
                                <div className={'font-medium p-2'}>Your name</div>
                                <input
                                    className={'border rounded-lg py-3 w-full'}
                                    type="text"/>
                            </div>

                            <div className={'flex space-x-4'}>
                                <div className={'flex-1'}>
                                    <div className={'font-medium p-2'}>Email</div>
                                    <input
                                        className={'border rounded-lg py-3 w-full'}
                                        type="text"/>
                                </div>

                                <div className={'flex-1'}>
                                    <div className={'font-medium p-2'}>Phone</div>
                                    <input
                                        className={'border rounded-lg py-3 w-full'}
                                        type="text"/>
                                </div>
                            </div>

                            <div>
                                <div className={'font-medium p-2'}>Property Type</div>
                                <select name="property" className={'border rounded-lg py-3 w-full px-4'}>
                                    <option selected disabled>-- Select One --</option>
                                    <option value="abc">ABC</option>
                                    <option value="def">DEF</option>
                                </select>
                            </div>

                            <div>
                                <div className={'font-medium p-2'}>Message</div>
                                <textarea className={'w-full'} cols="30" rows="10"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;