import { ContactBanner } from '../../assets/images/contact';
import { BreadCrumb, Button } from '../../components';
import { CUSTOMER_PATHS } from '../../constants';
import { CONTACT_INFORMATIONS } from '../../constants/contact';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';

const ContactUsPage = () => {
  const { handleSubmit, control, reset } = useForm();
  const handleQuestions = () => {
    setTimeout(() => {
      reset();
    }, 450);
  };
  return (
    <div className="container">
      <div className="pb-[14px] xl:pb-[30px]">
        <BreadCrumb
          items={[
            { name: 'Home', path: CUSTOMER_PATHS.ROOT },
            { name: 'Contact Us', path: CUSTOMER_PATHS.CONTACTUS },
          ]}
        />
        <div className="w-full h-[260px] xl:h-[480px] relative">
          <img
            src={ContactBanner}
            className="w-full h-full object-cover"
            alt="contact image"
          />
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-center">
              <h1 className="text-[30px] xl:text-[54px]">Contact Us</h1>
              <span className="xl:text-[20px]">keep in touch with us</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[14px] pt-[14px]">
          <div className="w-full">
            <h2 className="text-black xl:text-[20px]">Contact Information</h2>
            <p>
              We are here to assist you with any inquiries or concerns you may
              have regarding your shopping experience. Please feel free to reach
              out to us using the following details:
            </p>
          </div>
          <div className="w-full gap-[14px] flex flex-col xl:flex-row xl:justify-between">
            <div className="">
              <h2 className="text-black xl:text-[20px]">The Office</h2>
              <div className="flex flex-col gap-3">
                {CONTACT_INFORMATIONS.map((item) => (
                  <div className="flex items-start gap-2 xl:gap-5">
                    <div className="flex flex-shrink-0 justify-center text-primary items-center w-[30px] h-[30px]">
                      <item.icon size={50} />
                    </div>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full xl:w-[600px]">
              <h2 className="text-black xl:text-[20px]">Got Any Questions?</h2>
              <p className="pb-[14px]">
                Use the form below to get in touch with us
              </p>
              <form
                onSubmit={handleSubmit(handleQuestions)}
                className="w-full h-max flex flex-col gap-[14px]"
              >
                <div className="flex flex-col gap-5">
                  <Input name="name" control={control} placeholder="Name *" />
                  <Input placeholder="Email *" name="email" control={control} />
                </div>
                <div className="flex flex-col gap-5">
                  <div className="col-sm-6">
                    <Input placeholder="Phone" name="phone" control={control} />
                  </div>
                  <div className="col-sm-6">
                    <Input
                      placeholder="Subject"
                      name="subject"
                      control={control}
                    />
                  </div>
                </div>
                <Input
                  placeholder="Message *"
                  name="message"
                  control={control}
                  renderProp={(props, invalid, field, error) => (
                    <div>
                      <textarea
                        className={`w-full py-[8.5px] resize-none px-3 bg-bgInPut border outline-none focus:border-primary ${
                          invalid ? 'border-red-600' : ''
                        }`}
                        cols={30}
                        rows={4}
                        {...props}
                        {...field}
                      />
                      {invalid && (
                        <p className="text-sm text-red-600">{error?.message}</p>
                      )}
                    </div>
                  )}
                />
                <Button arrow className=" w-max ml-auto" text="SUBMIT" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
