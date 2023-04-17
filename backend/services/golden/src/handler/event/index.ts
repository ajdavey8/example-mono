
export const eventHandler: EventHandler<ExternalPaymentFailedEvent> = async (
  payload,
  { requestId }
): Promise<void> => {
  const logger = loggerLibrary.init();

  logger.info({
    message: "This is an example of event handler.",
    details: { payload, requestId },
  });

  if (process.env.PUBLISH_EVENT) {
    await publishOptimusEvent(
      new PaymentCreationFailedEvent({
        payload: {
          step: "GoldenService: example of publishing an event",
          error: "",
          errors: [
            {
              message: "Unknown error",
              details: "",
            },
          ],
          paymentId: "123",
          endToEndId: "456",
          payingFrom: {
            iban: "IBAN",
            nameOnBankAccount: "John Smith",
          },
        },
        options: {
          requestId: requestId,
          attributes: {
            system: OriginSystem.UNKNOWN,
          },
        },
      })
    );
  }
};

/**
 * Compose the event handler.
 */
export const handler = captureException(
  handleEvent({
    name: EventName.EXTERNAL_PAYMENT_FAILED,
    handler: eventHandler,
  })
);
