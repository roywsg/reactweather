import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input.tsx";
import { AppContext } from "@/context/appContext.ts";
import useApiRecorder from "@/hooks/useApiRecorder.ts";
import { usePrevious } from "@/hooks/usePrevious.ts";
import { OpenWeatherQuery } from "@/lib/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRef, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SearchFormSection() {
  const appContext = useContext(AppContext);
  const prevQuery = usePrevious<OpenWeatherQuery>(appContext?.query);

  const [formError, setFormError] = useState<any>(null);

  const { isLoading, error, setError, run, setRun, setQuery } =
    useApiRecorder();
  const cityRef = createRef<HTMLInputElement>();
  const countryRef = createRef<HTMLInputElement>();

  useEffect(() => {
    appContext && appContext.setIsLoading(isLoading);
    if (error?.message) setFormError(error?.message);
    if (error) setFormError(error);
    console.log(error);
  }, [isLoading, error]);

  useEffect(() => {
    if (
      prevQuery?.city !== appContext?.query?.city ||
      prevQuery?.country !== appContext?.query?.country
    ) {
      onSubmit(appContext!.query as OpenWeatherQuery);
    }
  }, [appContext?.query]);

  const formSchema = z.object({
    city: z.string().max(50).nonempty(),
    country: z.string().max(5).nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.city !== "" || values.country === "") {
    }
    setQuery(values);
    setRun(run + 1);
    if (cityRef.current) cityRef.current.value = values.city;
    if (countryRef.current) countryRef.current.value = values.country;
  }

  function clear() {
    if (cityRef.current) cityRef.current.value = "";
    if (countryRef.current) countryRef.current.value = "";
    setFormError(null);
    setError(null);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"block sm:flex space-x-2 items-center justify-between"}
        >
          <div className={"flex my-4 items-center space-x-2"}>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={
                      "md:flex space-x-0 items-center sm:space-x-2 sm:block"
                    }
                  >
                    <FormLabel>City: </FormLabel>
                    <FormControl>
                      <Input placeholder="Osaka" {...field} ref={cityRef} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <div
                    className={
                      "block space-x-0 sm:flex items-center sm:space-x-2"
                    }
                  >
                    <FormLabel>Country: </FormLabel>
                    <FormControl>
                      <Input placeholder="JP" {...field} ref={countryRef} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="actions block sm:flex space-x-2">
            <Button type="submit">Search</Button>
            <Button type="button" onClick={clear}>
              Clear
            </Button>
          </div>
        </form>
      </Form>

      {formError !== null && (
        <Alert variant={"destructive"}>
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
